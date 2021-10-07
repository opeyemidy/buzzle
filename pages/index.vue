<template>
  <div>
    <!-- ***** Header Area Start ***** -->
    <header class="header-area header-sticky">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <nav class="main-nav">
              <!-- ***** Logo Start ***** -->
              <NuxtLink to="/" class="logo">
              <h4 style="color: #000">BUZZLE</h4>
                <!-- <img src="~/assets/images/logo.png" alt="BUZZLE" /> -->
              </NuxtLink>
              <!-- ***** Logo End ***** -->
              <!-- ***** Menu Start ***** -->
              <ul class="nav" :class="active ? 'd-block' : 'd-none'">
                <li v-for="(link, i) in links" :key="i">
                  <NuxtLink
                    :to="link.to"
                    :class="{ active: $route.hash === link.to }"
                    >{{ link.name }}</NuxtLink
                  >
                </li>
                <li v-if="!$auth.user">
                  <NuxtLink

                    to="/login"

                    >Login</NuxtLink
                  >
                <li v-if="!$auth.user" >
                  <NuxtLink
                    to="/register"

                    >Register</NuxtLink
                  >
                </li>
                <li v-if="$auth.user" >
                  <NuxtLink
                    to="/dashboard"

                    >Dashboard</NuxtLink
                  >
                </li>

              </ul>
              <a
                class="menu-trigger"
                :class="{ active }"
                @click="active = !active"
              >
                <span>Menu</span>
              </a>
              <!-- ***** Menu End ***** -->
            </nav>
          </div>
        </div>
      </div>
    </header>
    <!-- ***** Header Area End ***** -->

    <!-- ***** Welcome Area Start ***** -->
    <div id="welcome" class="welcome-area">
      <!-- ***** Header Text Start ***** -->
      <div class="header-text">
        <div class="container">
          <div class="row">
            <div
              class="
                offset-xl-3
                col-xl-6
                offset-lg-2
                col-lg-8 col-md-12 col-sm-12
              "
            >
              <h1>
                Trusted and Reliable website to trade your <strong>gift cards</strong>
              </h1>
              <p>
                An awesome place to trade securely with no worries or delay. It is perfectly built for you.
              </p>
              <NuxtLink to="/register" class="main-button-slider"
                >Discover More</NuxtLink
              >
            </div>
          </div>
        </div>
      </div>
      <!-- ***** Header Text End ***** -->
    </div>
    <!-- ***** Welcome Area End ***** -->

    <!-- ***** Features Small Start ***** -->
    <section class="section home-feature">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="row">
              <!-- ***** Features Small Item Start ***** -->
              <div
                class="col-lg-4 col-md-6 col-sm-6 col-12"
                data-scroll-reveal="enter bottom move 50px over 0.6s after 0.2s"
              >
                <div class="features-small-item">
                  <div class="icon">
                    <i
                      ><img src="~/assets/images/featured-item-01.png" alt=""
                    /></i>
                  </div>
                  <h5 class="features-title">FAST PAYOUT</h5>
                  <p>
                    Our payment is fast on every withdrawal you make on our platform
                  </p>
                </div>
              </div>
              <!-- ***** Features Small Item End ***** -->

              <!-- ***** Features Small Item Start ***** -->
              <div
                class="col-lg-4 col-md-6 col-sm-6 col-12"
                data-scroll-reveal="enter bottom move 50px over 0.6s after 0.4s"
              >
                <div class="features-small-item">
                  <div class="icon">
                    <i
                      ><img src="~/assets/images/featured-item-01.png" alt=""
                    /></i>
                  </div>
                  <h5 class="features-title">ROUND THE CLOCK ACCESS</h5>
                  <p>We are online 24/7 to do business and help you make money round-the-clock</p>
                </div>
              </div>
              <!-- ***** Features Small Item End ***** -->

              <!-- ***** Features Small Item Start ***** -->
              <div
                class="col-lg-4 col-md-6 col-sm-6 col-12"
                data-scroll-reveal="enter bottom move 50px over 0.6s after 0.6s"
              >
                <div class="features-small-item">
                  <div class="icon">
                    <i
                      ><img src="~/assets/images/featured-item-01.png" alt=""
                    /></i>
                  </div>
                  <h5 class="features-title">SECURE TRADING</h5>
                  <p>
                    We handle millions in transactions daily. Trust us to pay you every single time.
                  </p>
                </div>
              </div>
              <!-- ***** Features Small Item End ***** -->
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- ***** Features Small End ***** -->

    <!-- ***** Features Big Item Start ***** -->
    <section id="features" class="section padding-top-70 padding-bottom-0">
      <div class="container">
        <div class="row">
          <div
            class="col-lg-5 col-md-12 col-sm-12 align-self-center"
            data-scroll-reveal="enter left move 30px over 0.6s after 0.4s"
          >
            <img
              src="~/assets/images/left-image.png"
              class="rounded img-fluid d-block mx-auto"
              alt="App"
            />
          </div>
          <div class="col-lg-1"></div>
          <div
            class="
              col-lg-6 col-md-12 col-sm-12
              align-self-center
              mobile-top-fix
            "
          >
            <div class="left-heading">
              <h2 class="section-title">NO EXTRA CHARGES</h2>
            </div>
            <div class="left-text">
              <p>
                We charge nothing extra for transactions. You can only get paid according to our fixed rates on the platform.
              </p>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <div class="hr"></div>
          </div>
        </div>
      </div>
    </section>
    <!-- ***** Features Big Item End ***** -->

    <!-- ***** Features Big Item Start ***** -->
    <section class="section padding-bottom-100">
      <div class="container">
        <div class="row">
          <div
            class="
              col-lg-6 col-md-12 col-sm-12
              align-self-center
              mobile-bottom-fix
            "
          >
            <div class="left-heading">
              <h2 class="section-title">
                Track your transactions and payments
              </h2>
            </div>
            <div class="left-text">
              <p>
                you always have access to check your transaction and payment history from the day you make your first transaction
              </p>
            </div>
          </div>
          <div class="col-lg-1"></div>
          <div
            class="
              col-lg-5 col-md-12 col-sm-12
              align-self-center
              mobile-bottom-fix-big
            "
            data-scroll-reveal="enter right move 30px over 0.6s after 0.4s"
          >
            <img
              src="~/assets/images/right-image.png"
              class="rounded img-fluid d-block mx-auto"
              alt="App"
            />
          </div>
        </div>
      </div>
    </section>
    <!-- ***** Features Big Item End ***** -->

    <!-- ***** Home Parallax Start ***** -->
    <section id="work-process" class="mini">
      <div class="mini-content">
        <div class="container">
          <div class="row">
            <div class="offset-lg-3 col-lg-6">
              <div class="info">
                <h1>Dealing Process</h1>
                <p>
                  As member you are going to be dealing with us following the process below
                </p>
              </div>
            </div>
          </div>

          <!-- ***** Mini Box Start ***** -->
          <div class="row">
            <div class="col-lg-3 col-md-4 col-sm-6 col-12">
              <NuxtLink to="/" class="mini-box">
                <i
                  ><img src="~/assets/images/work-process-item-01.png" alt=""
                /></i>
                <strong>Create Account</strong>
                <span>Sign Up on our website with your valid details and add your bank account or mobile money number.</span>
              </NuxtLink>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6 col-12">
              <NuxtLink to="/" class="mini-box">
                <i
                  ><img src="~/assets/images/work-process-item-01.png" alt=""
                /></i>
                <strong>Begin Trade</strong>
                <span>You can start a trade by simply clicking on Sell GiftCards on the dashboard menu. Select the gift card you want to sell and upload it.</span>
              </NuxtLink>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6 col-12">
              <NuxtLink to="/" class="mini-box">
                <i
                  ><img src="~/assets/images/work-process-item-01.png" alt=""
                /></i>
                <strong>Wait For Confirmation</strong>
                <span>Wait for your transaction to be processed, this usually takes less than 5 minutes. Once your card has been redeemed, your wallet will be credited immediately.</span>
              </NuxtLink>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6 col-12">
              <NuxtLink to="/" class="mini-box">
                <i
                  ><img src="~/assets/images/work-process-item-01.png" alt=""
                /></i>
                <strong>Withdraw Funds</strong>
                <span>You can withdraw your funds at anytime you want with no hassle. Pretty easy right? Now sign up and begin trading like a boss.</span>
              </NuxtLink>
            </div>
          </div>
          <!-- ***** Mini Box End ***** -->
        </div>
      </div>
    </section>
    <!-- ***** Home Parallax End ***** -->

    <!-- ***** Testimonials Start ***** -->
    <!-- <section id="testimonials" class="section">
      <div class="container"> -->
        <!-- ***** Section Title Start ***** -->
        <!-- <div class="row">
          <div class="col-lg-12">
            <div class="center-heading">
              <h2 class="section-title">What do they say?</h2>
            </div>
          </div>
          <div class="offset-lg-3 col-lg-6">
            <div class="center-text">
              <p>
                Donec tempus, sem non rutrum imperdiet, lectus orci fringilla
                nulla, at accumsan elit eros a turpis. Ut sagittis lectus
                libero.
              </p>
            </div>
          </div>
        </div> -->
        <!-- ***** Section Title End ***** -->

        <!-- <div class="row"> -->
          <!-- ***** Testimonials Item Start ***** -->
          <!-- <div class="col-lg-4 col-md-6 col-sm-12">
            <div class="team-item">
              <div class="team-content">
                <i><img src="~/assets/images/testimonial-icon.png" alt="" /></i>
                <p>
                  Proin a neque nisi. Nam ipsum nisi, venenatis ut nulla quis,
                  egestas scelerisque orci. Maecenas a finibus odio.
                </p>
                <div class="user-image">
                  <img src="http://placehold.it/60x60" alt="" />
                </div>
                <div class="team-info">
                  <h3 class="user-name">Catherine Soft</h3>
                  <span>Managing Director</span>
                </div>
              </div>
            </div>
          </div> -->
          <!-- ***** Testimonials Item End ***** -->

          <!-- ***** Testimonials Item Start ***** -->
          <!-- <div class="col-lg-4 col-md-6 col-sm-12">
            <div class="team-item">
              <div class="team-content">
                <i><img src="~/assets/images/testimonial-icon.png" alt="" /></i>
                <p>
                  Integer molestie aliquam gravida. Nullam nec arcu finibus,
                  imperdiet nulla vitae, placerat nibh. Cras maximus venenatis
                  molestie.
                </p>
                <div class="user-image">
                  <img src="http://placehold.it/60x60" alt="" />
                </div>
                <div class="team-info">
                  <h3 class="user-name">Kelvin Wood</h3>
                  <span>Digital Marketer</span>
                </div>
              </div>
            </div>
          </div> -->
          <!-- ***** Testimonials Item End ***** -->

          <!-- ***** Testimonials Item Start ***** -->
          <!-- <div class="col-lg-4 col-md-6 col-sm-12">
            <div class="team-item">
              <div class="team-content">
                <i><img src="~/assets/images/testimonial-icon.png" alt="" /></i>
                <p>
                  Quisque diam odio, maximus ac consectetur eu, auctor non
                  lorem. Cras quis est non ante ultrices molestie. Ut vehicula
                  et diam at aliquam.
                </p>
                <div class="user-image">
                  <img src="http://placehold.it/60x60" alt="" />
                </div>
                <div class="team-info">
                  <h3 class="user-name">David Martin</h3>
                  <span>Website Manager</span>
                </div>
              </div>
            </div>
          </div> -->
          <!-- ***** Testimonials Item End ***** -->
        <!-- </div> -->
      <!-- </div>
    </section> -->
    <!-- ***** Testimonials End ***** -->

    <!-- ***** Pricing Plans Start ***** -->
    <!-- <section id="pricing-plans" class="section colored">
      <div class="container"> -->
        <!-- ***** Section Title Start ***** -->
        <!-- <div class="row">
          <div class="col-lg-12">
            <div class="center-heading">
              <h2 class="section-title">Pricing Plans</h2>
            </div>
          </div>
          <div class="offset-lg-3 col-lg-6">
            <div class="center-text">
              <p>
                Donec vulputate urna sed rutrum venenatis. Cras consequat magna
                quis arcu elementum, quis congue risus volutpat.
              </p>
            </div>
          </div>
        </div> -->
        <!-- ***** Section Title End ***** -->

        <!-- <div class="row"> -->
          <!-- ***** Pricing Item Start ***** -->
          <!-- <div
            class="col-lg-4 col-md-6 col-sm-12"
            data-scroll-reveal="enter bottom move 50px over 0.6s after 0.2s"
          >
            <div class="pricing-item">
              <div class="pricing-header">
                <h3 class="pricing-title">Starter</h3>
              </div>
              <div class="pricing-body">
                <div class="price-wrapper">
                  <span class="currency">$</span>
                  <span class="price">14.50</span>
                  <span class="period">monthly</span>
                </div>
                <ul class="list">
                  <li class="active">60 GB space</li>
                  <li class="active">600 GB transfer</li>
                  <li class="active">Pro Design Panel</li>
                  <li>15-minute support</li>
                  <li>Unlimited Emails</li>
                  <li>24/7 Security</li>
                </ul>
              </div>
              <div class="pricing-footer">
                <NuxtLink to="/" class="main-button">Purchase Now</NuxtLink>
              </div>
            </div>
          </div> -->
          <!-- ***** Pricing Item End ***** -->

          <!-- ***** Pricing Item Start ***** -->
          <!-- <div
            class="col-lg-4 col-md-6 col-sm-12"
            data-scroll-reveal="enter bottom move 50px over 0.6s after 0.4s"
          >
            <div class="pricing-item active">
              <div class="pricing-header">
                <h3 class="pricing-title">Premium</h3>
              </div>
              <div class="pricing-body">
                <div class="price-wrapper">
                  <span class="currency">$</span>
                  <span class="price">21.50</span>
                  <span class="period">monthly</span>
                </div>
                <ul class="list">
                  <li class="active">120 GB space</li>
                  <li class="active">1200 GB transfer</li>
                  <li class="active">Pro Design Panel</li>
                  <li class="active">15-minute support</li>
                  <li>Unlimited Emails</li>
                  <li>24/7 Security</li>
                </ul>
              </div>
              <div class="pricing-footer">
                <NuxtLink to="/" class="main-button">Purchase Now</NuxtLink>
              </div>
            </div>
          </div> -->
          <!-- ***** Pricing Item End ***** -->

          <!-- ***** Pricing Item Start ***** -->
          <!-- <div
            class="col-lg-4 col-md-6 col-sm-12"
            data-scroll-reveal="enter bottom move 50px over 0.6s after 0.6s"
          >
            <div class="pricing-item">
              <div class="pricing-header">
                <h3 class="pricing-title">Advanced</h3>
              </div>
              <div class="pricing-body">
                <div class="price-wrapper">
                  <span class="currency">$</span>
                  <span class="price">42.00</span>
                  <span class="period">monthly</span>
                </div>
                <ul class="list">
                  <li class="active">250 GB space</li>
                  <li class="active">5000 GB transfer</li>
                  <li class="active">Pro Design Panel</li>
                  <li class="active">15-minute support</li>
                  <li class="active">Unlimited Emails</li>
                  <li class="active">24/7 Security</li>
                </ul>
              </div>
              <div class="pricing-footer">
                <NuxtLink to="/" class="main-button">Purchase Now</NuxtLink>
              </div>
            </div>
          </div> -->
          <!-- ***** Pricing Item End ***** -->
        <!-- </div>
      </div>
    </section> -->
    <!-- ***** Pricing Plans End ***** -->

    <!-- ***** Counter Parallax Start ***** -->
    <section class="counter">
      <div class="content">
        <div class="container">
          <div class="row">
            <div class="col-lg-3 col-md-6 col-sm-12">
              <div class="count-item decoration-bottom">
                <strong>22+</strong>
                <span>Active Cards</span>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12">
              <div class="count-item decoration-top">
                <strong>300+</strong>
                <span>Happy Clients</span>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12">
              <div class="count-item decoration-bottom">
                <strong>1000+</strong>
                <span>Transactions</span>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12">
              <div class="count-item">
                <strong>1M+</strong>
                <span>Payments</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- ***** Counter Parallax End ***** -->

    <!-- ***** Blog Start ***** -->
    <!-- <section id="blog" class="section">
      <div class="container"> -->
        <!-- ***** Section Title Start ***** -->
        <!-- <div class="row">
          <div class="col-lg-12">
            <div class="center-heading">
              <h2 class="section-title">Blog Entries</h2>
            </div>
          </div>
          <div class="offset-lg-3 col-lg-6">
            <div class="center-text">
              <p>
                Integer molestie aliquam gravida. Nullam nec arcu finibus,
                imperdiet nulla vitae, placerat nibh. Cras maximus venenatis
                molestie.
              </p>
            </div>
          </div>
        </div> -->
        <!-- ***** Section Title End ***** -->

        <!-- <div class="row">
          <div class="col-lg-4 col-md-6 col-sm-12">
            <div class="blog-post-thumb">
              <div class="img">
                <img src="~/assets/images/blog-item-01.png" alt="" />
              </div>
              <div class="blog-content">
                <h3>
                  <NuxtLink to="#">Vivamus ac vehicula dui</NuxtLink>
                </h3>
                <div class="text">
                  Cras aliquet ligula dui, vitae fermentum velit tincidunt id.
                  Praesent eu finibus nunc. Nulla in sagittis eros. Aliquam
                  egestas augue.
                </div>
                <NuxtLink to="/" class="main-button">Read More</NuxtLink>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 col-sm-12">
            <div class="blog-post-thumb">
              <div class="img">
                <img src="~/assets/images/blog-item-02.png" alt="" />
              </div>
              <div class="blog-content">
                <h3>
                  <NuxtLink to="/">Phasellus convallis augue</NuxtLink>
                </h3>
                <div class="text">
                  Aliquam commodo ornare nisl, et scelerisque nisl dignissim ac.
                  Vestibulum finibus urna ut velit venenatis, vel ultrices
                  sapien mattis.
                </div>
                <NuxtLink to="/" class="main-button">Read More</NuxtLink>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 col-sm-12">
            <div class="blog-post-thumb">
              <div class="img">
                <img src="~/assets/images/blog-item-03.png" alt="" />
              </div>
              <div class="blog-content">
                <h3>
                  <NuxtLink to="/">Nam gravida purus non</NuxtLink>
                </h3>
                <div class="text">
                  Maecenas eu erat vitae dui convallis consequat vel gravida
                  nulla. Vestibulum finibus euismod odio, ut tempus enim varius
                  eu.
                </div>
                <NuxtLink to="/" class="main-button">Read More</NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section> -->
    <!-- ***** Blog End ***** -->

    <!-- ***** Contact Us Start ***** -->
    <!-- <section id="contact-us" class="section colored"> -->
      <!-- <div class="container"> -->
        <!-- ***** Section Title Start ***** -->
        <!-- <div class="row">
          <div class="col-lg-12">
            <div class="center-heading">
              <h2 class="section-title">Talk To Us</h2>
            </div>
          </div>
          <div class="offset-lg-3 col-lg-6">
            <div class="center-text">
              <p>
                Maecenas pellentesque ante faucibus lectus vulputate
                sollicitudin. Cras feugiat hendrerit semper.
              </p>
            </div>
          </div>
        </div> -->
        <!-- ***** Section Title End ***** -->

        <!-- <div class="row"> -->
          <!-- ***** Contact Text Start ***** -->
          <!-- <div class="col-lg-4 col-md-6 col-sm-12">
            <h5 class="margin-bottom-30">Keep in touch</h5>
            <div class="contact-text">
              <p>
                110-220 Quisque diam odio, maximus ac consectetur eu, 10260
                <br />auctor non lorem
              </p>
              <p>
                You are NOT allowed to re-distribute BUZZLE template on any
                template collection websites. Thank you.
              </p>
            </div>
          </div> -->
          <!-- ***** Contact Text End ***** -->

          <!-- ***** Contact Form Start ***** -->
          <!-- <div class="col-lg-8 col-md-6 col-sm-12">
            <div class="contact-form">
              <form id="contact" action="" method="get">
                <div class="row">
                  <div class="col-lg-6 col-md-12 col-sm-12">
                    <fieldset>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        class="form-control"
                        placeholder="Full Name"
                        required=""
                      />
                    </fieldset>
                  </div>
                  <div class="col-lg-6 col-md-12 col-sm-12">
                    <fieldset>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        class="form-control"
                        placeholder="E-Mail Address"
                        required=""
                      />
                    </fieldset>
                  </div>
                  <div class="col-lg-12">
                    <fieldset>
                      <textarea
                        id="message"
                        name="message"
                        rows="6"
                        class="form-control"
                        placeholder="Your Message"
                        required=""
                      ></textarea>
                    </fieldset>
                  </div>
                  <div class="col-lg-12">
                    <fieldset>
                      <button
                        id="form-submit"
                        type="submit"
                        class="main-button"
                      >
                        Send Message
                      </button>
                    </fieldset>
                  </div>
                </div>
              </form>
            </div>
          </div> -->
          <!-- ***** Contact Form End ***** -->
        <!-- </div> -->
      <!-- </div> -->
    <!-- </section> -->
    <!-- ***** Contact Us End ***** -->

    <!-- ***** Footer Start ***** -->
    <footer>
      <div class="container">
        <div class="row">
          <div class="col-lg-12 col-md-12 col-sm-12">
            <ul class="social">
              <li>
                <NuxtLink to="/"><i class="fa fa-facebook"></i></NuxtLink>
              </li>
              <li>
                <NuxtLink to="/"><i class="fa fa-twitter"></i></NuxtLink>
              </li>
              <li>
                <NuxtLink to="/"><i class="fa fa-linkedin"></i></NuxtLink>
              </li>
              <li>
                <NuxtLink to="/"><i class="fa fa-rss"></i></NuxtLink>
              </li>
              <li>
                <NuxtLink to="/"><i class="fa fa-dribbble"></i></NuxtLink>
              </li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <p class="copyright">
              Copyright &copy; 2021 BUZZLE
            </p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  auth: 'guest',
  name: 'Home',
  layout: 'guest',
  data() {
    return {
      links: [
        {
          name: 'Home',
          to: '#welcome',
        },
        {
          name: 'About',
          to: '#features',
        },
        {
          name: 'Work Process',
          to: '#work-process',
        },
      //   {
      //     name: 'Testimonials',
      //     to: '#testimonials',
      //   },
      //   {
      //     name: 'Pricing Tables',
      //     to: '#pricing-plans',
      //   },
      //   {
      //     name: 'Blog Entries',
      //     to: '#blog',
      //   },
      //   {
      //     name: 'Contact Us',
      //     to: '#contact-us',
      //   },
      ],
      active: false,
    }
  },
  head() {
    return {
      title: 'Login — Buzzle',
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
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Raleway:100,300,400,500,700,900');
@import url('~/assets/css/bootstrap.min.css');
@import url('~/assets/css/font-awesome.css');
@import url('~/assets/css/templatemo-softy-pinko.css');
/* .nav .fade.in {
  animation-name: fadeIn;
}

.nav .fade.out {
  animation-name: fadeOut;
} */

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(startYposition);
  }
  100% {
    opacity: 1;
    transform: translateY(endYposition);
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
    transform: translateY(startYposition);
  }
  100% {
    opacity: 0;
    transform: translateY(endYposition);
  }
}
</style>
