<template>
  <div>
    <page-loader v-if="$fetchState.pending" />
    <CRow v-else>
      <CCol col="12" md="7" xl="8" class="order-1 order-md-0 order-sm-1">
        <CCard>
          <CCardBody>
            <CRow class="justify-content-between">
              <CCol md="6">
                <h3 class="success">
                  <p class="m-0" style="font-size: 0.8rem">Wallet Balance</p>
                  ₦{{ toReadableAmount(balance) }}
                </h3>
              </CCol>

              <CCol md="6" class="d-flex flex-md-row-reverse">
                <h3 class="danger">
                  <p class="m-0" style="font-size: 0.8rem">Total Withdrawal</p>
                  ₦{{ toReadableAmount(withdraw) }}
                </h3>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
        <CCard v-if="pinIsSet">
          <CCardHeader> Request for Payment </CCardHeader>
          <CCardBody>
            <p v-if="!accounts.find((a) => a.default)" class="mt-0">
              <b class="text-danger" style="font-size: 2rem">Note:</b> There
              must be at least One bank account below and must be set to default
              before payment can be processed
            </p>
            <CForm>
              <CRow>
                <CCol col="12" sm="6">
                  <CInput label="Amount" placeholder="Amount to withdraw" />
                </CCol>
                <CCol col="12" sm="6">
                  <CInput label="Pin" placeholder="wallet pin">
                    <template #append>
                      <CButton type="submit" color="primary"> submit</CButton>
                    </template>
                  </CInput>
                </CCol>
              </CRow>
            </CForm>
          </CCardBody>
        </CCard>
        <CCard>
          <CCardHeader>
            <CIcon name="cil-pencil" /> Add Bank Account
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
              <ValidationObserver ref="form">
                <CForm @submit.prevent="addBankAccount">
                  <CRow>
                    <CCol sm="6">
                      <ValidationProvider
                        v-slot="{ errors }"
                        name="Account Name"
                        rules="required|alpha_spaces"
                      >
                        <CInput
                          v-model="accountData.name"
                          :is-valid="toSetisValid(accountData.name, errors)"
                          :invalid-feedback="errors[0]"
                          label="Account Name"
                        />
                      </ValidationProvider>
                    </CCol>
                    <CCol sm="6">
                      <ValidationProvider
                        v-slot="{ errors }"
                        name="Bank Name"
                        rules="required|alpha_spaces"
                      >
                        <CInput
                          v-model="accountData.bankName"
                          :is-valid="toSetisValid(accountData.bankName, errors)"
                          :invalid-feedback="errors[0]"
                          label="Bank Name"
                        />
                      </ValidationProvider>
                    </CCol>
                    <CCol sm="6">
                      <ValidationProvider
                        v-slot="{ errors }"
                        name="Account Number"
                        rules="required|digits:10"
                      >
                        <CInput
                          v-model="accountData.accountNumber"
                          :is-valid="
                            toSetisValid(accountData.accountNumber, errors)
                          "
                          :invalid-feedback="errors[0]"
                          label="Account Number"
                        />
                      </ValidationProvider>
                    </CCol>
                    <CCol sm="6">
                      <ValidationProvider
                        v-slot="{ errors }"
                        name="Pin"
                        rules="required|digits:4"
                      >
                        <CInput
                          v-model="accountData.pin"
                          :is-valid="toSetisValid(accountData.pin, errors)"
                          :invalid-feedback="errors[0]"
                          label="Pin"
                          type="password"
                        />
                      </ValidationProvider>
                    </CCol>
                  </CRow>

                  <div class="text-right">
                    <CButton
                      type="submit"
                      color="primary"
                      :disabled="isLoading || !pinIsSet"
                    >
                      {{ isLoading ? 'submitting' : 'Add Account' }}</CButton
                    >
                  </div>
                </CForm>
              </ValidationObserver>
            </CCardBody>
          </CCollapse>
        </CCard>
        <CCard>
          <CCardBody>
            <h5 class="mb-3">Payment Bank Accounts</h5>
            <CDataTable
              hover
              striped
              :items="accounts"
              :fields="fields"
              :clickable-rows="false"
            >
              <template #actions="data">
                <td class="py-2">
                  <CButton
                    :color="data.item.default ? 'grey' : 'primary'"
                    :variant="data.item.default ? 'ghost' : 'outline'"
                    class="d-block d-md-inline-block mb-2 mb-md-0"
                    size="sm"
                    :disabled="data.item.default"
                    @click="setAction(data.item, 'default')"
                  >
                    {{ data.item.default ? 'Default' : 'Set as default' }}
                  </CButton>
                  <CButton
                    class="d-block d-md-inline-block"
                    color="danger"
                    variant="outline"
                    size="sm"
                    @click="setAction(data.item, 'delete')"
                  >
                    Delete
                  </CButton>
                </td></template
              >
            </CDataTable>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol v-if="!pinIsSet" col="12" md="5" xl="4" class="order-0">
        <CCard>
          <CCardBody>
            <ValidationObserver ref="form">
              <CForm @submit.prevent="onSetPin">
                <h1>Set Pin</h1>
                <p class="text-muted">Set pin for your account wallet</p>
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Pin"
                  rules="required|digits:4"
                >
                  <CInput
                    v-model="setPinData.pin"
                    :is-valid="toSetisValid(setPinData.pin, errors)"
                    :invalid-feedback="errors[0]"
                    label="Pin"
                    type="password"
                    description="pin to authorize actions in account wallet"
                  />
                </ValidationProvider>
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Confirm Pin"
                  rules="required|digits:4"
                >
                  <CInput
                    v-model="setPinData.confirmPin"
                    :is-valid="toSetisValid(setPinData.confirmPin, errors)"
                    :invalid-feedback="errors[0]"
                    label="Confirm Pin"
                    type="password"
                  />
                </ValidationProvider>
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Password"
                  rules="required"
                >
                  <CInput
                    v-model="setPinData.password"
                    :is-valid="toSetisValid(setPinData.password, errors)"
                    :invalid-feedback="errors[0]"
                    label="Password"
                    type="password"
                  />
                </ValidationProvider>
                <div class="text-right">
                  <CButton type="submit" color="primary" :disabled="settingPin">
                    {{ settingPin ? 'submitting' : 'submit' }}</CButton
                  >
                </div>
              </CForm>
            </ValidationObserver>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <custom-modal :show="showPinModal">
      <template #header>
        {{
          action === 'delete' ? 'Delete Account' : 'Set Default ' + 'Account'
        }}</template
      >
      <CForm @submit.prevent="confirmAction">
        <CInput
          v-model="pin"
          placeholder="wallet pin"
          label="Pin"
          type="password"
          required
        />
        <div class="text-right">
          <CButton type="submit" :disabled="isConfirming" color="primary">{{
            isConfirming ? 'Submitting' : 'Confirm'
          }}</CButton>
          <CButton color="danger" @click="closeConfirmation">Cancel</CButton>
        </div>
      </CForm>
    </custom-modal>
  </div>
</template>

<script>
export default {
  name: 'Wallet',
  data() {
    return {
      settingPin: false,
      accountData: {
        name: '',
        bankName: '',
        accountNumber: '',
        pin: '',
      },
      setPinData: {
        pin: '',
        confirmPin: '',
        password: '',
      },
      accounts: [],
      balance: 0,
      withdraw: 0,
      pinIsSet: false,
      collapseDuration: 0,
      fields: [
        { key: 'name', label: 'Account Name', _classes: 'font-weight-bold' },
        { key: 'bankName' },
        { key: 'accountNumber' },
        { key: 'actions' },
      ],
      activePage: 1,
      formCollapsed: false,
      showPinModal: false,
      action: '',
      selectedAccount: '',
      pin: '',
      isConfirming: false,
    }
  },
  async fetch() {
    const { accounts, balance, withdraw, pinIsSet } =
      await this.$request.getWallet(this.$auth.user.id)
    this.accounts = accounts
    this.balance = balance
    this.withdraw = withdraw
    this.pinIsSet = pinIsSet
  },
  head() {
    return {
      title: 'Wallet — Buzzle',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: 'My custom description',
        },
      ],
    }
  },
  watch: {},
  methods: {
    addBankAccount() {
      this.submitTriggered = true
      this.$refs.form.validate().then(async (success) => {
        if (!success) {
          return
        }
        try {
          this.isLoading = true
          const response = await this.$request.addAccount(this.accountData)
          this.isLoading = false
          if (response) {
            this.$vToastify.success('account added successfully')
            this.accounts = response.accounts
            for (const property in this.accountData) {
              this.accountData[property] = ''
            }
            this.submitTriggered = false
            this.$refs.form.reset()
          }
        } catch ({ response }) {
          console.log(response)
          this.isLoading = false
          this.$vToastify.error(response.data.message)
        }
      })
    },
    onSetPin() {
      this.submitTriggered = true
      this.$refs.form.validate().then(async (success) => {
        if (!success) {
          return
        }
        try {
          const response = await this.$request.setPin(this.setPinData)
          if (!response) {
            this.$vToastify.success('Pin set successfully')
          }
        } catch ({ response }) {
          this.$vToastify.error(response.data.message)
        }
      })
    },
    setAction(data, action) {
      this.selectedAccount = data.accountNumber
      this.action = action
      this.showPinModal = true
    },
    async confirmAction() {
      this.isConfirming = true
      try {
        let response

        if (this.action === 'delete') {
          response = await this.$request.deleteAccount(this.selectedAccount, {
            pin: this.pin,
          })
        } else {
          response = await this.$request.setDefaultAccount(
            this.selectedAccount,
            {
              pin: this.pin,
            }
          )
        }
        this.isConfirming = false
        if (!response && this.action === 'delete') {
          this.$vToastify.success('Account successfully deleted')
          this.accounts.splice(this.accounts.indexOf(this.selectedAccount), 1)
        } else {
          this.$vToastify.success('Account successfully set to default')
          this.accounts = response.accounts
        }

        this.closeConfirmation()
      } catch ({ response }) {
        this.isConfirming = false
        this.$vToastify.error(response.data.message)
      }
    },
    closeConfirmation() {
      this.selectedAccount = ''
      this.pin = ''
      this.showPinModal = false
    },
  },
}
</script>
<style>
.primary {
  color: var(--primary);
}
.info {
  color: var(--info);
}
.success {
  color: var(--success);
}
.danger {
  color: var(--danger);
}
</style>
