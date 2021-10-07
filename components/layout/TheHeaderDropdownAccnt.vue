<template>
  <CDropdown
    in-nav
    class="c-header-nav-items"
    placement="bottom-end"
    add-menu-classes="pt-0"
  >
    <template #toggler>
      <CHeaderNavLink>
        <avatar
          v-if="!$auth.user.avatar"
          :username="username"
          :size="32"
        ></avatar>
        <div v-else class="c-avatar">
          <img :src="$auth.user.avatar" class="c-avatar-img" />
        </div>
      </CHeaderNavLink>
    </template>
    <CDropdownHeader tag="div" class="text-center" color="light">
      <strong>Settings</strong>
    </CDropdownHeader>
    <CDropdownItem to="/profile">
      <CIcon name="cil-user" /> Profile
    </CDropdownItem>
    <CDropdownItem @click="logout">
      <CIcon name="cil-lock-locked" /> Logout
    </CDropdownItem>
  </CDropdown>
</template>

<script>
import Avatar from 'vue-avatar'
export default {
  name: 'TheHeaderDropdownAccnt',
  components: {
    Avatar,
  },
  data() {
    return {
      itemsCount: 42,
      username: this.$auth?.user.username || 'Anonymous',
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout({
        data: {
          refreshToken: this.$auth.strategy.refreshToken
            .get()
            .replace('Bearer ', ''),
        },
      })
    },
  },
}
</script>

<style scoped>
.c-icon {
  margin-right: 0.3rem;
}
</style>
