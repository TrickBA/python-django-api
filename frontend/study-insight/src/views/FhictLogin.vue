<script>

  export default {
    name: "PostLogin",
    data() {
      return {
        authorizationURLBase: "https://identity.fhict.nl/connect/authorize",
        responseType: "id_token token",
        clientId: "i872953-angular2",
        redirectUri: "http://localhost:3000/login",
        scope: "openid profile fhict fhict_personal"
      }
    },
    mounted() {
      this.createLoginUrl().then(function (url) {
        window.location.href = url;
      });

    },
    methods: {
      createLoginUrl() {
        return new Promise(resolve => {
          let state = this.generateNonce();
          let url = this.authorizationURLBase
            + "?response_type="
            + encodeURIComponent(this.responseType)
            + "&client_id="
            + encodeURIComponent(this.clientId)
            + "&state="
            + encodeURIComponent(state)
            + "&redirect_uri="
            + encodeURIComponent(this.redirectUri)
            + "&scope="
            + encodeURIComponent(this.scope)
            + "&nonce="
            + encodeURIComponent(state);
          resolve(url);
        });

      },
      generateNonce() {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < 40; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
      }

    }
  }
</script>

<style scoped>

</style>
