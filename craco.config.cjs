// module.exports = {
//   style: {
//     postcss: {
//       plugins: [require("tailwindcss"), require("autoprefixer")],
//     },
//   },
// };

// import tailwindcss from "tailwindcss";
// import autoprefixer from "autoprefixer";
// const style = {
//   postcss: {
//     plugins: [tailwindcss, autoprefixer],
//   },
// };
// export default {
//   style,
// };

// module.exports = {
//   webpack: {
//     configure: {
//       module: {
//         rules: [
//           {
//             test: /\.m?js$/,
//             resolve: {
//               fullySpecified: false,
//             },
//           },
//         ],
//       },
//     },
//   },
// };

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // Call the function to generate or modify index.html
      // generateIndexHtml();
      return webpackConfig;
    },
  },
};
