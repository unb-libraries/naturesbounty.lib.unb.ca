<script setup lang="ts">
const props = defineProps<{ images: { file: string, caption: string }[] }>()

const dialog = ref<HTMLDialogElement>()
const index = ref(0)
// Gates the contents: an <img> inside a closed dialog is still fetched by the
// browser, so nothing is requested until the lightbox is actually opened.
const isOpen = ref(false)

const current = computed(() => props.images[index.value]!)

// The lightbox shows a 1400px-tall derivative (~150KB); the multi-megabyte
// original is reserved for the download link.
const display = (file: string) => `/images/gallery/display/${file}`
const original = (file: string) => `/images/gallery/${file}`

function at(delta: number) {
  const n = props.images.length
  return (index.value + delta + n) % n
}

// Colorbox preloaded its neighbours, so stepping felt instant. Same here.
function preloadNeighbours() {
  for (const delta of [1, -1])
    new Image().src = display(props.images[at(delta)]!.file)
}

// Filenames on disk are opaque scan numbers (01a_300.jpg), so the download is
// renamed after the caption to give it the plant's name.
const downloadName = computed(() => `${current.value.caption
  .normalize('NFD')
  .replace(/[\u0300-\u036F\u2019']/g, '')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '')}.jpg`)

function open(i: number) {
  index.value = i
  isOpen.value = true
  dialog.value?.showModal()
  preloadNeighbours()
}

function step(delta: number) {
  index.value = at(delta)
  preloadNeighbours()
}

defineExpose({ open })
</script>

<template>
  <dialog
    ref="dialog"
    class="fixed inset-0 m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 backdrop:bg-black/85"
    @close="isOpen = false"
    @keydown.left="step(-1)"
    @keydown.right="step(1)"
  >
    <div v-if="isOpen" class="flex h-full items-center justify-center p-[1vh]" @click.self="dialog?.close()">
      <figure class="flex flex-col items-center gap-2">
        <img
          :src="display(current.file)"
          :alt="current.caption"
          class="max-h-[min(calc(98vh-6rem),1400px)] w-auto max-w-full object-contain bg-content shadow-lg"
        >
        <figcaption class="w-full bg-content px-4 py-2 text-center font-header text-sm">
          <p class="mb-1 text-center">
            {{ current.caption }}
          </p>
          <div class="flex flex-wrap items-center justify-center gap-4">
            <button type="button" class="text-link hover:text-link-hover" @click="step(-1)">
              &laquo; Prev
            </button>
            <span>{{ index + 1 }} of {{ images.length }}</span>
            <button type="button" class="text-link hover:text-link-hover" @click="step(1)">
              Next &raquo;
            </button>
            <a :href="original(current.file)" :download="downloadName">
              Download full size
            </a>
            <button type="button" class="text-link hover:text-link-hover" @click="dialog?.close()">
              Close
            </button>
          </div>
        </figcaption>
      </figure>
    </div>
  </dialog>
</template>
