export function footer(){
    return `<p>Calorie Statement</p>
    <p>
      2,000 calories a day is used for general nutrition advice, but calorie
      needs vary. Additional nutrition information available upon request
      in-store and on kfc.com. Prices, participation, and product availability
      may vary.
    </p>
    <p>
      Pepsi, Pepsi Globe, Mtn Dew, Mtn Dew Sweet Lightning, Sierra Mist are
      registered trademarks of PepsiCo, Inc. Dr Pepper is a registered
      trademark of Dr Pepper/Seven Up, Inc.
    </p>
    <!-- kfc logo  -->
    <div class="footer"></div>
    <img
      src="https://images.ctfassets.net/wtodlh47qxpt/25FSYFuEtGct8NSrtpKe6d/b602f6fe0bf294e6a6dff5d7648bf594/KFC_Logo.svg"
      class="logo"
      alt="kfc-logo"
    />
    <!-- footer contents -->
    <table>
      <tr>
        <td>KFC Food</td>
        <td>Support</td>
        <td>Legal</td>
        <td>KFC India</td>
      </tr>

      <tr>
        <td>Menu</td>
        <td>Get Help</td>
        <td>Terms and Conditions</td>
        <td>About KFC</td>
      </tr>

      <tr>
        <td>Order Lookup</td>
        <td>Contact Us</td>
        <td>Privacy Policy</td>
        <td>KFC Care</td>
      </tr>

      <tr>
        <td>Gift Card</td>
        <td>KFC Feedback</td>
        <td>Disclaimer</td>
        <td>Careers</td>
      </tr>

      <tr>
        <td>Nutrition Allergen</td>
        <td>Privacy Policy</td>
        <td>Caution Notice</td>
        <td>Our Golden Past</td>
      </tr>
    </table>

    <section class="location">
      <img
        class="location-logo"
        src="https://images.ctfassets.net/wtodlh47qxpt/6qgKpWUOIsrIiazhk3cdmF/d60b4c20be69bab1f939bf33348b67e9/Find_KFC.svg"
        alt=""
      />
      <a href="">Find a KFC</a>
    </section>

    <!-- play store link  -->
    <section class="play-store">
      <img
        src="https://images.ctfassets.net/wtodlh47qxpt/6BdZsyjLn64c06uCIE73d1/fb530f5d5231533b049463f6c7e8a2b1/google_play.svg"
        alt="Google play"
      />
      <img
        src="https://images.ctfassets.net/wtodlh47qxpt/em3mcMuAdXWlgucSJiTbS/d3ae7e51ed101d829e459355e255c47f/apple.svg"
        alt="apple store"
      />
    </section>

    <p class="copyright">
      Copyright © KFC Corporation 2021 All Rights Reserved
    </p>

    <!-- Social media link  -->
    <div class="socialmedia-links">
      <a href="https://www.instagram.com">
        <img
          src="https://images.ctfassets.net/wtodlh47qxpt/4ZHyPA2EeaoP3aqtNDriBA/463462a9c27b0aa585e12b21ce3766e0/Social_Insta_White.svg"
          alt="instagram"
      /></a>
      <a href="https://www.facebook.com">
        <img
          src="https://images.ctfassets.net/wtodlh47qxpt/dKiu2meLcfz2DNwsg7nZw/7194830b1ba6f25b158a23d6b2c4752c/Social_Facebook_White.svg"
          alt="facebook"
      /></a>
      <a href="https://www.twitter.com">
        <img
          src="https://images.ctfassets.net/wtodlh47qxpt/78z9x0WwdkdXwGVK726EKX/6599ca34ec88e2a6f46d7d94ed85a8ad/Social_Twitter_White.svg"
          alt="twitter"
      /></a>
    </div>`
}

document.querySelector(".footer-div").innerHTML = footer();