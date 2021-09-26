<template>
  <div>
    <CRow>
      <CCol lg="12">
        <transition name="fade">
          <CCard v-if="show">
            <CCardHeader>
              <CIcon name="cil-pencil" /> Profile
              <div class="card-header-actions">
                <CLink
                  class="card-header-action btn-minimize"
                  @click="formCollapsed = !formCollapsed"
                >
                  <CIcon
                    :name="`cil-chevron-${formCollapsed ? 'bottom' : 'top'}`"
                  />
                </CLink>
              </div>
            </CCardHeader>
            <CCollapse :show="formCollapsed">
              <CCardBody>
                <CForm>
                  <CRow>
                    <CCol md="6">
                      <CInput label="First name">
                        <template #prepend-content
                          ><CIcon name="cil-user"
                        /></template>
                      </CInput>
                    </CCol>
                    <CCol md="6">
                      <CInput label="Surname">
                        <template #prepend-content
                          ><CIcon name="cil-user"
                        /></template>
                      </CInput>
                    </CCol>
                    <CCol md="6">
                      <CInput label="Username">
                        <template #prepend-content
                          ><CIcon name="cil-user"
                        /></template> </CInput
                    ></CCol>
                    <CCol md="6">
                      <CInput
                        label="Email"
                        type="email"
                        autocomplete="email"
                        prepend="@"
                      />
                    </CCol>

                    <CCol md="6"> <CInput label="Phone Number" /></CCol>
                    <CCol md="6">
                      <CSelect
                        label="Gender"
                        :options="[
                          { label: 'Male', value: 'male' },
                          { label: 'Female', value: 'female' },
                        ]"
                    /></CCol>
                  </CRow>
                  <div class="form-actions d-flex justify-content-between">
                    <CButton type="submit" color="primary"
                      >Save changes</CButton
                    >
                    <CButton color="secondary">Change Password</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCollapse>
          </CCard>
        </transition>
      </CCol>
    </CRow>
  </div>
</template>

<script>
export default {
  name: 'Forms',
  data() {
    return {
      profile: {
        email: '',
        phone: '',
        firstname: '',
        surname: '',
        gender: '',
      },
      selected: [], // Must be an array reference!
      show: true,
      horizontal: { label: 'col-3', input: 'col-9' },
      options: ['Option 1', 'Option 2', 'Option 3'],
      selectOptions: [
        'Option 1',
        'Option 2',
        'Option 3',
        {
          value: 'some value',
          label: 'Selected option',
        },
      ],
      selectedOption: 'some value',

      formCollapsed: true,
      checkboxNames: [
        'Checkboxes',
        'Inline Checkboxes',
        'Checkboxes - custom',
        'Inline Checkboxes - custom',
      ],
      radioNames: [
        'Radios',
        'Inline Radios',
        'Radios - custom',
        'Inline Radios - custom',
      ],
    }
  },
  methods: {
    validator(val) {
      return val ? val.length >= 4 : false
    },
  },
}
</script>
