<template>
  <div>
    <CRow>
      <CCol lg="12">
        <transition name="fade">
          <CCard v-if="show">
            <CCardHeader> <CIcon name="cil-pencil" /> Profile </CCardHeader>
            <CCardBody>
              <ValidationObserver ref="form">
                <CRow class="d-flex justify-content-between">
                  <CCol col="12" sm="6" class="order-1 order-sm-0">
                    <h1>Update Profile</h1>
                    <p class="text-muted">Update your account profile</p>
                  </CCol>
                  <CCol col="12" sm="6" class="d-flex justify-content-sm-end">
                    <img
                      v-if="user.avatar"
                      class="order-0 order-sm-1"
                      :src="$auth.user.avatar"
                      alt="profile image"
                      width="100"
                      style="border-radius: 50%"
                    />
                  </CCol>
                </CRow>
                <CForm @submit.prevent="onSubmit">
                  <CRow>
                    <CCol md="6">
                      <CInput v-model="user.username" label="Username" readonly>
                        <template #prepend-content
                          ><CIcon name="cil-user"
                        /></template>
                      </CInput>
                    </CCol>
                    <CCol md="6">
                      <CInput
                        v-model="user.email"
                        label="Email"
                        type="email"
                        autocomplete="email"
                        prepend="@"
                        readonly
                      />
                    </CCol>
                    <CCol md="6">
                      <ValidationProvider
                        v-slot="{ errors }"
                        name="First name"
                        rules="alpha"
                      >
                        <CInput
                          v-model="user.firstName"
                          label="First name"
                          :is-valid="toSetisValid(user.firstName, errors)"
                          :invalid-feedback="errors[0]"
                        >
                          <template #prepend-content
                            ><CIcon name="cil-user"
                          /></template>
                        </CInput>
                      </ValidationProvider>
                    </CCol>
                    <CCol md="6">
                      <ValidationProvider
                        v-slot="{ errors }"
                        name="Surname"
                        rules="alpha"
                      >
                        <CInput
                          v-model="user.surname"
                          label="Surname"
                          :is-valid="toSetisValid(user.surname, errors)"
                          :invalid-feedback="errors[0]"
                        >
                          <template #prepend-content
                            ><CIcon name="cil-user"
                          /></template>
                        </CInput>
                      </ValidationProvider>
                    </CCol>
                    <CCol col="12">
                      <div
                        ref="preview"
                        class="d-flex overflow-auto flex-nowrap mb-3"
                      ></div>
                    </CCol>
                    <CCol md="3">
                      <CInputFile
                        label="Profile Picture"
                        accept=".png, .jpg, .jpeg"
                        @change="onFileSelected"
                      />
                    </CCol>
                    <CCol md="6">
                      <ValidationProvider
                        v-slot="{ errors }"
                        name="Phone Number"
                        rules="digits:11"
                      >
                        <CInput
                          v-model="user.phone"
                          label="Phone Number"
                          :is-valid="toSetisValid(user.phone, errors)"
                          :invalid-feedback="errors[0]"
                        />
                      </ValidationProvider>
                    </CCol>
                    <CCol md="3">
                      <CSelect
                        :value.sync="user.gender"
                        label="Gender"
                        :options="[
                          { label: '', value: '' },
                          { label: 'Male', value: 'male' },
                          { label: 'Female', value: 'female' },
                        ]"
                      />
                    </CCol>
                  </CRow>
                  <div class="form-actions d-flex justify-content-between">
                    <CButton
                      type="submit"
                      :disabled="isLoading"
                      color="primary"
                      >{{ isLoading ? 'Saving' : 'Save changes' }}</CButton
                    >
                    <CButton color="secondary" @click="passwordModal = true"
                      >Change Password</CButton
                    >
                  </div>
                </CForm>
              </ValidationObserver>
            </CCardBody>
          </CCard>
        </transition>
      </CCol>
    </CRow>
    <custom-modal :show="passwordModal">
      <template #header>Change Password</template>
      <CForm @submit.prevent="changePassowrd">
        <CInput
          v-model="passwordData.oldPassword"
          placeholder="old password"
          label="Old Password"
          type="password"
          required
        />
        <CInput
          v-model="passwordData.password"
          placeholder="new password"
          label="New Passowrd"
          type="password"
          required
        />
        <CInput
          v-model="passwordData.confirmPassword"
          placeholder="confirm password"
          label="Confirm Password"
          type="password"
          required
        />
        <div class="text-right">
          <CButton type="submit" :disabled="isUpdating" color="primary">{{
            isUpdating ? 'Updating' : 'Change'
          }}</CButton>
          <CButton color="danger" @click="closeConfirmation">Cancel</CButton>
        </div>
      </CForm>
    </custom-modal>
  </div>
</template>

<script>
export default {
  name: 'Forms',
  data() {
    return {
      user: Object.assign(
        {
          firstName: '',
          surname: '',
          phone: '',
          gender: '',
          avatar: '',
        },
        this.$auth.user
      ),
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
      passwordData: {
        oldPassword: '',
        password: '',
        confirmPassword: '',
      },
      isUpdating: false,
      passwordModal: false,
    }
  },
  methods: {
    validator(val) {
      return val ? val.length >= 4 : false
    },
    onSubmit() {
      this.submitTriggered = true
      this.$refs.form.validate().then(async (success) => {
        if (!success) {
          return
        }
        this.isLoading = true
        this.submitTriggered = false
        try {
          const data = new FormData()
          if (this.user.firstName) data.append('firstName', this.user.firstName)
          if (this.user.surname) data.append('surname', this.user.surname)
          if (this.selectedFile) data.append('avatar', this.selectedFile[0])
          if (this.user.phone) data.append('phone', this.user.phone)
          if (this.user.gender) data.append('gender', this.user.gender)
          const response = await this.$request.updateProfile(data)
          this.$vToastify.success('profile Updated')
          this.user.avatar = response.avatar
          this.isLoading = false
        } catch ({ response }) {
          this.$vToastify.error(response.data.message)
          this.isLoading = false
        }
      })
    },
    async changePassowrd() {
      this.isUpdating = true
      try {
        await this.$request.changePassword(this.passwordData)
        this.$vToastify.success('Password Updated')
        this.isUpdating = false
        this.closeConfirmation()
      } catch ({ response }) {
        this.isUpdating = false
        this.$vToastify.error(response.data.message)
      }
    },
    closeConfirmation() {
      for (const property in this.passwordData) {
        this.passwordData[property] = ''
      }
      this.passwordModal = false
    },
  },
}
</script>
