FROM ghcr.io/unb-libraries/drupal:11.x-1.x-unblib

# Install additional OS packages.
ENV ADDITIONAL_OS_PACKAGES="postfix php${PHP_VERSION}-ldap php${PHP_VERSION}-xmlreader php${PHP_VERSION}-zip php${PHP_VERSION}-pecl-redis"
ENV DRUPAL_SITE_ID="nbounty"
ENV DRUPAL_SITE_URI="naturesbounty.lib.unb.ca"
ENV DRUPAL_SITE_UUID="5386f767-6440-4d7e-8eb2-5578c3ae27c0"

# Build application.
COPY ./build/ /build/
RUN ${RSYNC_MOVE} /build/scripts/container/ /scripts/ && \
  /scripts/addOsPackages.sh && \
  /scripts/initOpenLdap.sh && \
  /scripts/setupStandardConf.sh && \
  /scripts/build.sh

# Deploy configuration.
COPY ./configuration ${DRUPAL_CONFIGURATION_DIR}
RUN /scripts/pre-init.d/72_secure_config_sync_dir.sh

# Deploy custom modules, themes.
COPY ./custom/themes ${DRUPAL_ROOT}/themes/custom
COPY ./custom/modules ${DRUPAL_ROOT}/modules/custom

# Container metadata.
LABEL ca.unb.lib.generator="drupal11" \
  org.opencontainers.image.title="naturesbounty.lib.unb.ca" \
  org.opencontainers.image.description="naturesbounty.lib.unb.ca outlines a study of plant exploration in New Brunswick from 1604 to 2000." \
  org.opencontainers.image.vendor="University of New Brunswick Libraries" \
  org.opencontainers.image.authors="UNB Libraries <libsupport@unb.ca>" \
  org.opencontainers.image.url="https://naturesbounty.lib.unb.ca" \
  org.opencontainers.image.source="https://github.com/unb-libraries/naturesbounty.lib.unb.ca" \
  org.opencontainers.image.version="$VERSION" \
  org.opencontainers.image.revision="$VCS_REF" \
  org.opencontainers.image.created="$BUILD_DATE"
