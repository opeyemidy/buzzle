export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/dashboard',
        icon: 'cil-speedometer',
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Transactions',
        to: '/transactions',
        icon: 'cil-calculator',
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Payments',
        to: '/payments',
        icon: 'cil-list',
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Wallet',
        to: '/wallet',
        icon: 'cil-user',
      },
    ],
  },
]
