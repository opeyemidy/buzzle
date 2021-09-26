export default function ({ $auth, redirect }) {
  // { store, redirect,  }
  // console.log(context)
  // If the user is not authenticated
  if ($auth.$state?.loggedIn || undefined) {
    return redirect('/dashboard')
  }
}
