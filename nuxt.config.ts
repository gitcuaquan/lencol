// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["bootstrap/dist/css/bootstrap.min.css"],
  app: {
    head: {
      script: [{ src: "/js/bootstrap.bundle.min.js" }],
    },
  },
  build: {
    extend(config, ctx) {
      config.resolve.symlinks = false;
    },
  },
});
