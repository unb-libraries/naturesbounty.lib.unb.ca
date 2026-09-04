<script setup>
useHead({ title: 'Gallery' })

const lightbox = ref()

const images = [
  { file: '01a_300.jpg', caption: 'Seabeach Groundsel, Senecio pseudoarnica Less.' },
  { file: '02a_300.jpg', caption: 'Nova Scotia False Foxglove, Agalinus neoscotica (Greene) Fern.' },
  { file: '03a_300.jpg', caption: 'Riverine Grape, Vitis riparia Michx.' },
  { file: '04a_300.jpg', caption: 'Groundnut, Apios americana Medik.' },
  { file: '05a_300.jpg', caption: 'Turtlehead, Chelone glabra L.' },
  { file: '06a_300.jpg', caption: 'White Pine, Pinus strobus L.' },
  { file: '07a_300.jpg', caption: 'Indian Cucumber-root, Medeola virginiana L.' },
  { file: '08a_300.jpg', caption: 'Pitcher-plant, Sarracenia purpurea L.' },
  { file: '09a_300.jpg', caption: 'Labrador Tea, Rhododendron groenlandicum (Oeder) Kron and Judd' },
  { file: '10a_300.jpg', caption: 'Fringed Polygala, Polygala paucifolia Wild.' },
  { file: '11a_300.jpg', caption: 'Northern Painted-cup, Castilleja septentrionalis Lindl.' },
  { file: '12a_300.jpg', caption: 'St. John River Oxytropis, Oxytropis campestris (L.) DC. var. johannensis Fern.' },
  { file: '13a_300.jpg', caption: 'Parker’s Pipewort, Eriocaulon parkeri B. L. Robins.' },
  { file: '14a_300.jpg', caption: 'Small-flowered Anemone, Anemone parviflora Michx.' },
  { file: '15a_300.jpg', caption: 'Glasswort, Samphire, Salicornia depressa Standl.' },
  { file: '16a_300.jpg', caption: 'Sea-milkwort, Lysimachia maritima (L.) Galasso, Banfi & Soldano' },
  { file: '17a_300.jpg', caption: 'Sea-lavender, Limonium carolinianum (Walt.) Britt.' },
  { file: '18a_300.jpg', caption: 'Chaffy Sedge, Carex paleacea Schreiber ex Wahl.' },
  { file: '19a_300.jpg', caption: 'Broad-fruited Burreed, Sparganium eurycarpum Engelm.' },
  { file: '20a_300.jpg', caption: 'Saltmarsh Aster, Symphyotrichum subulatum (Michx.) G. L. Nesom var. subulatum' },
  { file: '21a_300.jpg', caption: 'Livelong Saxifrage, Saxifraga paniculata P. Miller' },
  { file: '22a_300.jpg', caption: 'Marsh Felwort, Lomatogonium rotatum (L.) Fries' },
  { file: '23a_300.jpg', caption: 'Beachhead Iris, Iris setosa Pallax ex Link.' },
  { file: '24a_300.jpg', caption: 'Himalayan Balsam, Impatiens glandulifera Royle' },
  { file: '25a_300.jpg', caption: 'Cardinal-flower, Lobelia cardinalis L.' },
  { file: '26a_300.jpg', caption: 'Myrtle-leaved Willow, Salix myrtillifolia Anderss.' },
  { file: '27a_300.jpg', caption: 'Alpine Bilberry, Vaccinium uliginosum L.' },
  { file: '28a_300.jpg', caption: 'Pine-drops, Pterospora andromedea Nutt.' },
  { file: '29a_300.jpg', caption: 'Hair-like Sedge, Carex capillaris L.' },
  { file: '30a_300.jpg', caption: 'Wild Ginger, Asarum canadense L.' },
  { file: '31a_300.jpg', caption: 'Butterwort, Pinguicula vulgaris L.' },
  { file: '32a_300.jpg', caption: 'Carrion-flower, Smilax herbacea L.' },
  { file: '33a_300.jpg', caption: 'Bur Oak, Quercus macrocarpa Michx.' },
  { file: '34a_300.jpg', caption: 'Mountain Avens, Dryas integrifolia Vahl.' },
]
</script>

<template>
  <main>
    <h1>Gallery</h1>
    <ul class="gallery-grid">
      <li v-for="(image, i) in images" :key="image.file">
        <a
          :href="`/images/gallery/${image.file}`"
          :title="image.caption"
          @click.prevent="lightbox?.open(i)"
        >
          <img :src="`/images/gallery/thumbs/${image.file}`" :alt="image.caption">
        </a>
      </li>
    </ul>
    <GalleryLightbox ref="lightbox" :images="images" />
  </main>
</template>
