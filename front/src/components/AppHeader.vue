<template>
  <div class="v-container mx-auto d-flex align-center justify-center">
    <router-link to="/" class="v-btn v-theme--light v-btn--density-default v-btn--size-default v-btn--variant-text">
      <span class="v-btn__overlay"></span>
      <span class="v-btn__underlay"></span>
      <span class="v-btn__content">Accueil</span>
    </router-link>
    <router-link to="/planification" class="v-btn v-theme--light v-btn--density-default v-btn--size-default v-btn--variant-text">
      <span class="v-btn__overlay"></span>
      <span class="v-btn__underlay"></span>
      <span class="v-btn__content">Planification</span>
    </router-link>
    <router-link to="/reservations" class="v-btn v-theme--light v-btn--density-default v-btn--size-default v-btn--variant-text">
      <span class="v-btn__overlay"></span>
      <span class="v-btn__underlay"></span>
      <span class="v-btn__content">Mes réservations</span>
    </router-link>
    <router-link to="/profile" class="v-btn v-theme--light v-btn--density-default v-btn--size-default v-btn--variant-text">
      <span class="v-btn__overlay"></span>
      <span class="v-btn__underlay"></span>
      <span class="v-btn__content">profile</span>
    </router-link>
    <div class="v-spacer"></div>
    <div class="v-responsive" style="max-width: 160px">
      <div class="v-responsive__sizer"></div>

      <div class="v-responsive__content">
        <div
          class="v-input v-input--horizontal v-input--center-affix v-input--density-compact v-locale--is-ltr v-text-field"
        >
          <div class="v-input__control">
            <div
              class="v-field v-field--center-affix v-field--flat v-field--single-line v-field--variant-solo-filled v-theme--light rounded-lg v-locale--is-ltr"
            >
              <div class="v-field__overlay"></div>
              <div class="v-field__loader">
                <div
                  class="v-progress-linear v-theme--light v-locale--is-ltr"
                  role="progressbar"
                  aria-hidden="true"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style="
                    top: 0px;
                    height: 0px;
                    --v-progress-linear-height: 2px;
                    left: 50%;
                    transform: translateX(-50%);
                  "
                >
                  <div class="v-progress-linear__background" style="width: 100%"></div>
                  <div class="v-progress-linear__indeterminate">
                    <div class="v-progress-linear__indeterminate long"></div>
                    <div class="v-progress-linear__indeterminate short"></div>
                  </div>
                </div>
              </div>

              <div class="v-field__field" data-no-activator="">
                <label class="v-label v-field-label" for="input-5">Search</label
                ><input
                  size="1"
                  type="text"
                  id="input-5"
                  aria-describedby="input-5-messages"
                  class="v-field__input"
                />
              </div>

              <div class="v-field__outline"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-link to="/login" class="ms-4 v-btn v-theme--light v-btn--density-default v-btn--size-default v-btn--variant-text">
      <span class="v-btn__overlay"></span>
      <span class="v-btn__underlay"></span>
      <span class="v-btn__content">Se connecter</span>
    </router-link>
  </div>
</template>

<script setup lang="ts"></script>
<style scoped>
.link-style {
  color: black;
  text-decoration: none;
}
</style>
