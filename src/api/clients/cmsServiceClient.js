
exports.getFaq = ( profile ) => {

    let faq;

    if(profile === "DEFAULT"){
        faq = [
            {
                title: "DEFAULT - This is a 1 title",
                subtitle: "DEFAULT - This is a 1 subtitle",
                slug: "DEFAULT-first-faq",
                content: "This is a 1 content"
            },
            {
                title: "DEFAULT - This is a 2 title",
                subtitle: "DEFAULT - This is a 2 subtitle",
                slug: "DEFAULT-second-faq",
                content: "DEFAULT - This is a 2 content"
            },
            {
                title: "DEFAULT - This is a 3 title",
                subtitle: "DEFAULT - This is a 3 subtitle",
                slug: "DEFAULT-third-faq",
                content: "DEFAULT - This is a 3 content"
            },
        ]
    } else {
        faq = [
            {
                title: "This is a 1 title",
                subtitle: "This is a 1 subtitle",
                slug: "first-faq",
                content: "This is a 1 content"
            },
            {
                title: "This is a 2 title",
                subtitle: "This is a 2 subtitle",
                slug: "second-faq",
                content: "This is a 2 content"
            },
            {
                title: "This is a 3 title",
                subtitle: "This is a 3 subtitle",
                slug: "third-faq",
                content: "This is a 3 content"
            },
        ]
    }
    
    return faq;
    
};