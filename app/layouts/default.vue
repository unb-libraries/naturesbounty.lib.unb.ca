<template>
  <div class="min-h-screen bg-page">
    <NuxtRouteAnnouncer />
    <!-- 1400px matches the production theme, which overrides Bootstrap's
         container to `width: 1400px` above that breakpoint (1175px above
         1200px). The narrower `max-w-5xl` belongs to educationhistory, whose
         book presentation wants a constrained reading measure. -->
    <div class="mx-auto max-w-[1400px]">
      <div class="bg-header">
        <NuxtLink to="/" aria-label="Nature's Bounty home" class="block h-[158px] bg-[url('/images/logo.jpg')] bg-no-repeat bg-center" />
        <nav class="flex flex-wrap bg-nav px-4 font-body">
          <NuxtLink to="/" class="nav-link">
            Home
          </NuxtLink>
          <NuxtLink to="/foreword" class="nav-link">
            Foreword
          </NuxtLink>
          <NuxtLink to="/gallery" class="nav-link">
            Gallery
          </NuxtLink>
          <NuxtLink to="/biography" class="nav-link">
            Biography
          </NuxtLink>
          <NuxtLink to="/credits" class="nav-link">
            Credits
          </NuxtLink>
        </nav>
      </div>
      <div class="bg-content p-6">
        <slot />
      </div>
      <footer class="flex flex-wrap items-center justify-between gap-4 px-6 pt-4 pb-6 font-header">
        <p class="mb-0 text-left">
          © UNB Libraries
        </p>
        <a href="https://lib.unb.ca">
          <img src="/images/UNB_Lib_Black_Red.png" alt="UNB Libraries" class="max-w-[256px]">
        </a>
      </footer>
    </div>
  </div>
</template>
