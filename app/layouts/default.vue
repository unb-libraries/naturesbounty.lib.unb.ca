<template>
  <div class="flex min-h-screen flex-col bg-page">
    <NuxtRouteAnnouncer />
    <!-- 1400px matches the production theme, which overrides Bootstrap's
         container to `width: 1400px` above that breakpoint (1175px above
         1200px). educationhistory uses the same width.

         The column is a flex child that grows to fill the viewport, and the
         content area grows within it, so on a short page the white content
         panel stretches down and the footer sits at the bottom of the window
         rather than partway up it. `w-full` is needed because an auto-margined
         flex item shrinks to its content instead of stretching. -->
    <div class="mx-auto flex w-full max-w-[1400px] flex-1 flex-col">
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
      <div class="flex-1 bg-content p-6">
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
