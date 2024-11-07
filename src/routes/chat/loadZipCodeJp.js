const loadZipCodeJp = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://kmdsbng.github.io/zipcode_jp/api.js";
      script.async = true;
      script.onload = () => {
        window.ZipCodeJp.setRootUrl("https://kmdsbng.github.io/zipcode_jp/");
        resolve(window.ZipCodeJp);
      };
      document.body.appendChild(script);
    });
  };
  
  export default loadZipCodeJp;