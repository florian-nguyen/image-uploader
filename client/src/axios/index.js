const devURL = `http://localhost:8080`;

const proURL = `https://fng-dc-image-uploader.herokuapp.com`;

const base_url = process.env.NODE_ENV === "production" ? proURL : devURL;
// const base_url = devURL;
console.log(base_url);

export default base_url;
