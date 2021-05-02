const axios = require("axios");

exports.getFaq = async function (profile) {
  try {
    const res = await axios.get(
      "http://localhost:1337/faqs?type=" + profile.toLowerCase()
    );
    console.log(res);
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

exports.getFaqBySlug = ( profile, slug ) => {

    let faq;

    if(profile === "DEFAULT"){
        faq = {
                title: "DEFAULT - This is a 1 title",
                subtitle: "DEFAULT - This is a 1 subtitle",
                slug: ("DEFAULT-" + slug),
                content: "This is a 1 content"
            }
    } else {
        faq = 
            {
                title: "This is a 1 title",
                subtitle: "This is a 1 subtitle",
                slug: slug,
                content: "This is a 1 content"
            }
    }
    
    return faq;
};
