"use client";

import { useMemo, useState } from "react";
import { LeadChat } from "@/app/components/LeadChat";

type Project = {
  title: string;
  category: "Beauty" | "Food & Drink" | "Lifestyle" | "Pet Care";
  blurb: string;
  metric: string;
  image: string;
  url?: string;
  color: string;
};

const CLOUDINARY_BASE =
  "https://res.cloudinary.com/dvtdzotx2/image/upload/f_auto,q_auto,w_1400,c_fill,ar_16:9";

const projects: Project[] = [
  {
    title: "Lilikiwi",
    category: "Beauty",
    blurb: "A playful organic skincare experience made to feel safe for parents and delightful for children.",
    metric: "Shopify storefront",
    image: `${CLOUDINARY_BASE}/open-limits/lilikiwi`,
    url: "https://lilikiwi.fr/en",
    color: "#ffb7db",
  },
  {
    title: "Nerdy Nuts",
    category: "Food & Drink",
    blurb: "Colorful, craveable commerce for a peanut butter brand with a seriously playful personality.",
    metric: "DTC food commerce",
    image: `${CLOUDINARY_BASE}/open-limits/nerdy-nuts`,
    url: "https://nerdynuts.com/",
    color: "#b7ef66",
  },
  {
    title: "Bearaby",
    category: "Lifestyle",
    blurb: "Soft editorial storytelling and effortless shopping for beautifully designed weighted blankets.",
    metric: "Shopify Plus",
    image: `${CLOUDINARY_BASE}/open-limits/bearaby`,
    url: "https://bearaby.com/",
    color: "#8bdcff",
  },
  {
    title: "Hamel's Treats",
    category: "Pet Care",
    blurb: "Wholesome product storytelling for single-ingredient treats made for very happy dogs.",
    metric: "Pet food commerce",
    image: `${CLOUDINARY_BASE}/open-limits/hamels-treats-v2`,
    url: "https://hamelstreats.com/",
    color: "#ff9068",
  },
  {
    title: "Emani",
    category: "Beauty",
    blurb: "A polished beauty destination balancing clinical confidence with modern, inclusive glamour.",
    metric: "Beauty e-commerce",
    image: `${CLOUDINARY_BASE}/open-limits/emani`,
    url: "https://emani.com/",
    color: "#64e6c0",
  },
  {
    title: "Crav Burgers",
    category: "Food & Drink",
    blurb: "A bold, appetite-first experience with the energy of a cult neighborhood burger spot.",
    metric: "Hospitality website",
    image: `${CLOUDINARY_BASE}/open-limits/crav-burgers`,
    url: "https://www.cravburgers.shop/",
    color: "#ffb7db",
  },
  {
    title: "Vol Dog Food",
    category: "Pet Care",
    blurb: "High-energy pet nutrition commerce built around fresh food, expert guidance and character.",
    metric: "Interactive commerce",
    image: `${CLOUDINARY_BASE}/open-limits/vol-dog-food`,
    url: "https://www.voldogfood.com/",
    color: "#b7ef66",
  },
  {
    title: "Happy Pet",
    category: "Pet Care",
    blurb: "A minimal product story that makes smarter pet parenting feel simple and immediately useful.",
    metric: "Digital product launch",
    image: `${CLOUDINARY_BASE}/open-limits/happy-pet`,
    url: "https://happypet.care/",
    color: "#8bdcff",
  },
  {
    title: "Manitobah",
    category: "Lifestyle",
    blurb: "Story-rich commerce celebrating Indigenous design, craft and a global footwear community.",
    metric: "Shopify Plus",
    image: `${CLOUDINARY_BASE}/open-limits/manitobah`,
    url: "https://www.manitobah.com/",
    color: "#ffdd55",
  },
  {
    title: "Seerov",
    category: "Lifestyle",
    blurb: "A confident, editorial wellness experience built around intention, curiosity and personal freedom.",
    metric: "Wellness commerce",
    image: `${CLOUDINARY_BASE}/open-limits/seerov`,
    url: "https://seerov.com/",
    color: "#ffb7db",
  },
  {
    title: "Sherclan",
    category: "Lifestyle",
    blurb: "Quiet luxury and refined product storytelling for a contemporary Australian jewellery brand.",
    metric: "Luxury e-commerce",
    image: `${CLOUDINARY_BASE}/open-limits/sherclan`,
    url: "https://www.sherclan.com.au/",
    color: "#8bdcff",
  },
  {
    title: "Tato Pow",
    category: "Food & Drink",
    blurb: "A flavor-packed storefront with bold type, tactile product imagery and serious snack energy.",
    metric: "DTC food commerce",
    image: `${CLOUDINARY_BASE}/open-limits/tatopow`,
    url: "https://tatopow.com/",
    color: "#ff9068",
  },
  {
    title: "Articles of Style",
    category: "Lifestyle",
    blurb: "Premium menswear and bespoke wardrobe expertise translated into a polished consultation journey.",
    metric: "Luxury menswear",
    image: `${CLOUDINARY_BASE}/open-limits/articles-of-style`,
    url: "https://articlesofstyle.com/",
    color: "#c8b5ff",
  },
  {
    title: "Penrose Skin",
    category: "Beauty",
    blurb: "Luxury skincare storytelling with a rich product-first homepage and high-intent shopping journey.",
    metric: "Skincare commerce",
    image: "https://res.cloudinary.com/dvtdzotx2/image/upload/f_auto,q_auto,w_1400,c_fill,ar_16:9/open-limits/penrose-skin-website-1785014710041.jpg",
    url: "https://penroseskin.com/",
    color: "#64e6c0",
  },
  {
    title: "GODA",
    category: "Lifestyle",
    blurb: "Modern apparel commerce with a direct, product-led landing experience.",
    metric: "Fashion commerce",
    image: "https://res.cloudinary.com/dvtdzotx2/image/upload/f_auto,q_auto,w_1400,c_fill,ar_16:9/open-limits/goda-website-1785014717058.jpg",
    url: "https://godaclothing.com/",
    color: "#8bdcff",
  },
  {
    title: "Thomson Carter",
    category: "Beauty",
    blurb: "Premium perfume commerce designed for quick trust, clear offers and sensory brand positioning.",
    metric: "Fragrance commerce",
    image: "https://res.cloudinary.com/dvtdzotx2/image/upload/f_auto,q_auto,w_1400,c_fill,ar_16:9/open-limits/thomson-carter-website-1785014720817.jpg",
    url: "https://www.thomsoncarter.com/",
    color: "#ffdd55",
  },
  {
    title: "Anglo Spirit",
    category: "Lifestyle",
    blurb: "A refined brand storefront with a heritage feel and clear product-led browsing.",
    metric: "Lifestyle commerce",
    image: "https://res.cloudinary.com/dvtdzotx2/image/upload/f_auto,q_auto,w_1400,c_fill,ar_16:9/open-limits/anglo-spirit-replacement-1785015351446.png",
    url: "https://anglospirit.com/",
    color: "#ff9068",
  },
  {
    title: "Bay Smokes",
    category: "Lifestyle",
    blurb: "A bold, conversion-focused ecommerce experience for a high-velocity cannabis category brand.",
    metric: "DTC commerce",
    image: "https://res.cloudinary.com/dvtdzotx2/image/upload/f_auto,q_auto,w_1400,c_fill,ar_16:9/open-limits/bay-smokes-replacement-1785015346219.png",
    url: "https://baysmokes.com/",
    color: "#b7ef66",
  },
  {
    title: "Mystery Shirt In A Box",
    category: "Lifestyle",
    blurb: "Sports apparel commerce built around surprise, gifting and fast purchase intent.",
    metric: "Apparel commerce",
    image: "https://res.cloudinary.com/dvtdzotx2/image/upload/f_auto,q_auto,w_1400,c_fill,ar_16:9/open-limits/mystery-shirt-in-a-box-website-1785014731124.jpg",
    url: "https://mysteryshirtinabox.com/",
    color: "#8bdcff",
  },
  {
    title: "Frido",
    category: "Lifestyle",
    blurb: "Ergonomic product commerce that makes comfort, relief and product education immediately understandable.",
    metric: "Wellness commerce",
    image: "https://res.cloudinary.com/dvtdzotx2/image/upload/f_auto,q_auto,w_1400,c_fill,ar_16:9/open-limits/frido-website-1785014735116.jpg",
    url: "https://myfrido.com/",
    color: "#ffb7db",
  },
  {
    title: "Tasty Gains",
    category: "Food & Drink",
    blurb: "Nutrition commerce with a bold product story and simple path from craving to cart.",
    metric: "Food commerce",
    image: "https://res.cloudinary.com/dvtdzotx2/image/upload/f_auto,q_auto,w_1400,c_fill,ar_16:9/open-limits/tasty-gains-website-1785014738251.jpg",
    url: "https://tastygains.com/",
    color: "#ffdd55",
  },
  {
    title: "GymProLuxe",
    category: "Lifestyle",
    blurb: "Fitness product commerce built to explain the kit fast and move shoppers toward a focused offer.",
    metric: "Fitness commerce",
    image: "https://res.cloudinary.com/dvtdzotx2/image/upload/f_auto,q_auto,w_1400,c_fill,ar_16:9/open-limits/gymproluxe-website-1785014741756.jpg",
    url: "https://www.gymproluxestore.com/",
    color: "#64e6c0",
  },
  {
    title: "SNOW",
    category: "Beauty",
    blurb: "Teeth-whitening commerce with a benefit-first layout, trust markers and strong product hierarchy.",
    metric: "Beauty commerce",
    image: "https://res.cloudinary.com/dvtdzotx2/image/upload/f_auto,q_auto,w_1400,c_fill,ar_16:9/open-limits/snow-website-1785014745156.jpg",
    url: "https://www.trysnow.com/",
    color: "#8bdcff",
  },
  {
    title: "Lansinoh",
    category: "Lifestyle",
    blurb: "Parenting and baby-care commerce focused on reassurance, product education and gentle conversion.",
    metric: "Family commerce",
    image: "https://res.cloudinary.com/dvtdzotx2/image/upload/f_auto,q_auto,w_1400,c_fill,ar_16:9/open-limits/lansinoh-replacement-1785015341300.png",
    url: "https://lansinoh.com/",
    color: "#c8b5ff",
  },
  {
    title: "Resilia",
    category: "Lifestyle",
    blurb: "A mission-led digital experience built around credibility, outcomes and clear product messaging.",
    metric: "B2B platform",
    image: "https://res.cloudinary.com/dvtdzotx2/image/upload/f_auto,q_auto,w_1400,c_fill,ar_16:9/open-limits/resilia-website-1785014752674.jpg",
    url: "https://www.resilia.com/",
    color: "#b7ef66",
  },
  {
    title: "Jennah Organics",
    category: "Beauty",
    blurb: "Organic beauty commerce with a clean, direct storefront and product-first shopping path.",
    metric: "Beauty commerce",
    image: "https://res.cloudinary.com/dvtdzotx2/image/upload/f_auto,q_auto,w_1400,c_fill,ar_16:9/open-limits/jennah-organics-website-1785014756182.jpg",
    url: "https://jennahorganics.com/",
    color: "#ff9068",
  },
  {
    title: "Sans",
    category: "Food & Drink",
    blurb: "Non-alcoholic drink retail designed around range, choice and fast product discovery.",
    metric: "Drink commerce",
    image: "https://res.cloudinary.com/dvtdzotx2/image/upload/f_auto,q_auto,w_1400,c_fill,ar_16:9/open-limits/sans-website-1785014834309.jpg",
    url: "https://sansdrinks.com.au/",
    color: "#ffb7db",
  },
  {
    title: "Setu",
    category: "Lifestyle",
    blurb: "Supplement commerce built around science-backed messaging and simple wellness navigation.",
    metric: "Wellness commerce",
    image: "https://res.cloudinary.com/dvtdzotx2/image/upload/f_auto,q_auto,w_1400,c_fill,ar_16:9/open-limits/setu-website-1785014840319.jpg",
    url: "https://setu.in/",
    color: "#b7ef66",
  },
  {
    title: "AdTok",
    category: "Lifestyle",
    blurb: "A growth-focused B2B website with clear positioning and direct acquisition messaging.",
    metric: "Agency website",
    image: "https://res.cloudinary.com/dvtdzotx2/image/upload/f_auto,q_auto,w_1400,c_fill,ar_16:9/open-limits/adtok-website-1785014845392.jpg",
    url: "https://www.adtok.co/",
    color: "#8bdcff",
  },
  {
    title: "White Lion Labs",
    category: "Lifestyle",
    blurb: "A focused product and brand experience for a modern performance-led company.",
    metric: "Brand website",
    image: "https://res.cloudinary.com/dvtdzotx2/image/upload/f_auto,q_auto,w_1400,c_fill,ar_16:9/open-limits/white-lion-labs-website-1785014850414.jpg",
    url: "https://whitelionlabs.com/",
    color: "#ffdd55",
  },
  {
    title: "HumeHealth",
    category: "Lifestyle",
    blurb: "Health-tech commerce that makes personal body data feel approachable and actionable.",
    metric: "Health commerce",
    image: "https://res.cloudinary.com/dvtdzotx2/image/upload/f_auto,q_auto,w_1400,c_fill,ar_16:9/open-limits/humehealth-website-1785014857429.jpg",
    url: "https://humehealth.com/",
    color: "#c8b5ff",
  },
  {
    title: "Yorkshire Dental Suite",
    category: "Lifestyle",
    blurb: "A service-led dental website designed to build trust and route visitors into bookings.",
    metric: "Clinic website",
    image: "https://res.cloudinary.com/dvtdzotx2/image/upload/f_auto,q_auto,w_1400,c_fill,ar_16:9/open-limits/yorkshire-dental-suite-website-1785014867953.jpg",
    url: "https://www.yorkshiredentalsuite.co.uk/",
    color: "#64e6c0",
  },
  {
    title: "Bloom & Bond",
    category: "Beauty",
    blurb: "Hair wellness commerce with direct benefit messaging and product-first conversion design.",
    metric: "Beauty commerce",
    image: "https://res.cloudinary.com/dvtdzotx2/image/upload/f_auto,q_auto,w_1400,c_fill,ar_16:9/open-limits/bloom-and-bond-website-1785014874357.jpg",
    url: "https://trybloomandbond.com/",
    color: "#ff9068",
  },
  {
    title: "WeightRx",
    category: "Lifestyle",
    blurb: "Weight-care commerce with a direct offer structure and conversion-minded product education.",
    metric: "Wellness commerce",
    image: "https://res.cloudinary.com/dvtdzotx2/image/upload/f_auto,q_auto,w_1400,c_fill,ar_16:9/open-limits/weightrx-website-1785014880369.jpg",
    url: "https://weightrx.com/",
    color: "#ffb7db",
  },
  {
    title: "Everydaisy",
    category: "Beauty",
    blurb: "A feminine beauty storefront with soft brand energy and product-led navigation.",
    metric: "Beauty commerce",
    image: "https://res.cloudinary.com/dvtdzotx2/image/upload/f_auto,q_auto,w_1400,c_fill,ar_16:9/open-limits/everydaisy-website-1785014903075.jpg",
    url: "https://everydaisy.com/",
    color: "#c8b5ff",
  },
  {
    title: "Zorvera",
    category: "Beauty",
    blurb: "A modern wellness and beauty ecommerce experience with bold trust-building presentation.",
    metric: "Beauty commerce",
    image: "https://res.cloudinary.com/dvtdzotx2/image/upload/f_auto,q_auto,w_1400,c_fill,ar_16:9/open-limits/zorvera-website-1785014910600.jpg",
    url: "https://zorvera.com/",
    color: "#64e6c0",
  },
  {
    title: "Sacrasoul",
    category: "Beauty",
    blurb: "Aromatics commerce built around ritual, sensory storytelling and a calm path to purchase.",
    metric: "Wellness commerce",
    image: "https://res.cloudinary.com/dvtdzotx2/image/upload/f_auto,q_auto,w_1400,c_fill,ar_16:9/open-limits/sacrasoul-website-1785014919172.jpg",
    url: "https://sacrasoul.com/",
    color: "#ff9068",
  },
  {
    title: "iRestore",
    category: "Lifestyle",
    blurb: "At-home hair growth device commerce with strong education, proof and product hierarchy.",
    metric: "Health commerce",
    image: "https://res.cloudinary.com/dvtdzotx2/image/upload/f_auto,q_auto,w_1400,c_fill,ar_16:9/open-limits/irestore-website-1785014925113.jpg",
    url: "https://www.irestorelaser.com/",
    color: "#ffb7db",
  },
  {
    title: "Aloesun",
    category: "Beauty",
    blurb: "Sun-care commerce with bright product positioning and clear benefit-led shopping.",
    metric: "Beauty commerce",
    image: "https://res.cloudinary.com/dvtdzotx2/image/upload/f_auto,q_auto,w_1400,c_fill,ar_16:9/open-limits/aloesun-website-1785014995383.jpg",
    url: "https://aloesun.com/",
    color: "#b7ef66",
  },
  {
    title: "Plantmade",
    category: "Lifestyle",
    blurb: "Superfood nutrition commerce with a fresh product story and simple shopping flow.",
    metric: "Wellness commerce",
    image: "https://res.cloudinary.com/dvtdzotx2/image/upload/f_auto,q_auto,w_1400,c_fill,ar_16:9/open-limits/plantmade-website-1785015002403.jpg",
    url: "https://www.plantmade.co/",
    color: "#8bdcff",
  },
  {
    title: "Primal",
    category: "Lifestyle",
    blurb: "Natural supplement commerce built around trust, education and broad product discovery.",
    metric: "Supplement commerce",
    image: "https://res.cloudinary.com/dvtdzotx2/image/upload/f_auto,q_auto,w_1400,c_fill,ar_16:9/open-limits/primal-website-1785015008417.jpg",
    url: "https://primalharvest.com/",
    color: "#ffdd55",
  },
  {
    title: "Skin Choice",
    category: "Beauty",
    blurb: "Skincare commerce with direct acne-care positioning and a simple product-led offer.",
    metric: "Skincare commerce",
    image: "https://res.cloudinary.com/dvtdzotx2/image/upload/f_auto,q_auto,w_1400,c_fill,ar_16:9/open-limits/skin-choice-website-1785015014014.jpg",
    url: "https://www.skinchoice.com/",
    color: "#c8b5ff",
  },
  {
    title: "Dermovia",
    category: "Beauty",
    blurb: "Skincare product commerce focused on education, routines and problem-solution clarity.",
    metric: "Skincare commerce",
    image: "https://res.cloudinary.com/dvtdzotx2/image/upload/f_auto,q_auto,w_1400,c_fill,ar_16:9/open-limits/dermovia-website-1785015019502.jpg",
    url: "https://www.dermovia.com/",
    color: "#64e6c0",
  },
  {
    title: "Full Hair Club",
    category: "Beauty",
    blurb: "Hair-care commerce with bold brand voice and a streamlined treatment-focused shopping path.",
    metric: "Hair commerce",
    image: "https://res.cloudinary.com/dvtdzotx2/image/upload/f_auto,q_auto,w_1400,c_fill,ar_16:9/open-limits/full-hair-club-website-1785015024431.jpg",
    url: "https://fullhairclub.com/",
    color: "#ff9068",
  },
  {
    title: "Vayose",
    category: "Lifestyle",
    blurb: "A modern ecommerce storefront with clean positioning and lifestyle-focused product presentation.",
    metric: "Lifestyle commerce",
    image: "https://res.cloudinary.com/dvtdzotx2/image/upload/f_auto,q_auto,w_1400,c_fill,ar_16:9/open-limits/vayose-website-1785015033556.jpg",
    url: "https://vayose.com/",
    color: "#b7ef66",
  },
  {
    title: "Stretched Fusion",
    category: "Lifestyle",
    blurb: "Fitness commerce built around at-home strength training, guidance and strong landing-page clarity.",
    metric: "Fitness commerce",
    image: "https://res.cloudinary.com/dvtdzotx2/image/upload/f_auto,q_auto,w_1400,c_fill,ar_16:9/open-limits/stretched-fusion-website-1785015038321.jpg",
    url: "https://stretchedfusion.com/",
    color: "#8bdcff",
  },
  {
    title: "Holy Gels",
    category: "Beauty",
    blurb: "Beauty commerce with a focused gel product story and clean purchase path.",
    metric: "Beauty commerce",
    image: "https://res.cloudinary.com/dvtdzotx2/image/upload/f_auto,q_auto,w_1400,c_fill,ar_16:9/open-limits/holy-gels-website-1785015043275.jpg",
    url: "https://holygels.com/",
    color: "#ffdd55",
  },
  {
    title: "Nurecover",
    category: "Lifestyle",
    blurb: "Recovery and wellness commerce built around a strong product promise and fast education.",
    metric: "Wellness commerce",
    image: "https://res.cloudinary.com/dvtdzotx2/image/upload/f_auto,q_auto,w_1400,c_fill,ar_16:9/open-limits/nurecover-website-1785015051488.jpg",
    url: "https://nurecover.com/",
    color: "#64e6c0",
  },
  {
    title: "Nomadica",
    category: "Food & Drink",
    blurb: "Wine commerce with editorial brand energy and strong product-led browsing.",
    metric: "Drink commerce",
    image: "https://res.cloudinary.com/dvtdzotx2/image/upload/f_auto,q_auto,w_1400,c_fill,ar_16:9/open-limits/nomadica-replacement-1785015488180.png",
    url: "https://www.explorenomadica.com/",
    color: "#ffb7db",
  },
  {
    title: "The Fresh Cookie Lab",
    category: "Food & Drink",
    blurb: "Bakery commerce with a warm, playful product story and crave-first shopping flow.",
    metric: "Food commerce",
    image: "https://res.cloudinary.com/dvtdzotx2/image/upload/f_auto,q_auto,w_1400,c_fill,ar_16:9/open-limits/the-fresh-cookie-lab-website-1785015070160.jpg",
    url: "https://thefreshcookielab.com/",
    color: "#b7ef66",
  },
  {
    title: "Flo Pilates",
    category: "Lifestyle",
    blurb: "A local studio website built around movement, class discovery and booking intent.",
    metric: "Studio website",
    image: "https://res.cloudinary.com/dvtdzotx2/image/upload/f_auto,q_auto,w_1400,c_fill,ar_16:9/open-limits/flo-pilates-website-1785015073326.jpg",
    url: "https://www.flopilates.com/",
    color: "#8bdcff",
  },
  {
    title: "AVA Mayfair",
    category: "Beauty",
    blurb: "Home-fragrance commerce with trust-led storytelling and premium product positioning.",
    metric: "Fragrance commerce",
    image: "https://res.cloudinary.com/dvtdzotx2/image/upload/f_auto,q_auto,w_1400,c_fill,ar_16:9/open-limits/ava-mayfair-website-1785015078306.jpg",
    url: "https://avamayfair.com/",
    color: "#ffdd55",
  },
  {
    title: "Sadboy Saga",
    category: "Lifestyle",
    blurb: "Streetwear commerce with a distinct brand voice and direct collection-led shopping.",
    metric: "Fashion commerce",
    image: "https://res.cloudinary.com/dvtdzotx2/image/upload/f_auto,q_auto,w_1400,c_fill,ar_16:9/open-limits/sadboy-saga-website-1785015085950.jpg",
    url: "https://sadboysaga.com/",
    color: "#c8b5ff",
  },
  {
    title: "Javvy Coffee",
    category: "Food & Drink",
    blurb: "Coffee commerce with a crisp product promise, strong offer framing and subscription-ready shopping.",
    metric: "Drink commerce",
    image: "https://res.cloudinary.com/dvtdzotx2/image/upload/f_auto,q_auto,w_1400,c_fill,ar_16:9/open-limits/javvy-coffee-website-1785015208504.jpg",
    url: "https://javvycoffee.com/",
    color: "#64e6c0",
  },
  {
    title: "Fat Cow Skincare",
    category: "Beauty",
    blurb: "Playful skincare commerce with a memorable brand voice and product-first conversion path.",
    metric: "Skincare commerce",
    image: "https://res.cloudinary.com/dvtdzotx2/image/upload/f_auto,q_auto,w_1400,c_fill,ar_16:9/open-limits/fat-cow-skincare-website-1785015215535.jpg",
    url: "https://fatcowskin.com/",
    color: "#ff9068",
  },
  {
    title: "Fem8",
    category: "Lifestyle",
    blurb: "Women’s wellness commerce with clean trust-building and direct product education.",
    metric: "Wellness commerce",
    image: "https://res.cloudinary.com/dvtdzotx2/image/upload/f_auto,q_auto,w_1400,c_fill,ar_16:9/open-limits/fem8-website-1785015225056.jpg",
    url: "https://fem-8.com/",
    color: "#ffb7db",
  },
  {
    title: "Zoomie",
    category: "Pet Care",
    blurb: "Pet-focused commerce with friendly positioning and a simple product discovery path.",
    metric: "Pet commerce",
    image: "https://res.cloudinary.com/dvtdzotx2/image/upload/f_auto,q_auto,w_1400,c_fill,ar_16:9/open-limits/zoomie-website-1785015230577.jpg",
    url: "https://tryzoomie.com/",
    color: "#b7ef66",
  },
  {
    title: "JOGA",
    category: "Lifestyle",
    blurb: "A lifestyle commerce experience with clean brand presence and focused shopping structure.",
    metric: "Lifestyle commerce",
    image: "https://res.cloudinary.com/dvtdzotx2/image/upload/f_auto,q_auto,w_1400,c_fill,ar_16:9/open-limits/joga-website-1785015235603.jpg",
    url: "https://shopjoga.com/en-us",
    color: "#8bdcff",
  },
  {
    title: "Dead Simple",
    category: "Lifestyle",
    blurb: "A direct, minimal ecommerce experience with sharp product presentation and simple messaging.",
    metric: "Lifestyle commerce",
    image: "https://res.cloudinary.com/dvtdzotx2/image/upload/f_auto,q_auto,w_1400,c_fill,ar_16:9/open-limits/dead-simple-website-1785015241615.jpg",
    url: "https://dead-simple.co.uk/",
    color: "#ffdd55",
  },
  {
    title: "Rugged Beard",
    category: "Beauty",
    blurb: "Grooming commerce with a strong masculine brand language and product-led shopping.",
    metric: "Grooming commerce",
    image: "https://res.cloudinary.com/dvtdzotx2/image/upload/f_auto,q_auto,w_1400,c_fill,ar_16:9/open-limits/rugged-beard-website-1785015250136.jpg",
    url: "https://ruggedevo.com/",
    color: "#c8b5ff",
  },
  {
    title: "OMA & ME",
    category: "Beauty",
    blurb: "Beauty commerce with a polished brand world and focused product storytelling.",
    metric: "Beauty commerce",
    image: "https://res.cloudinary.com/dvtdzotx2/image/upload/f_auto,q_auto,w_1400,c_fill,ar_16:9/open-limits/oma-and-me-website-1785015256947.jpg",
    url: "https://oma-and-me.com/",
    color: "#64e6c0",
  },
];

const reviews = [
  {
    quote:
      "Open Limits made the whole business feel more premium. The new experience is clearer, faster and finally feels like us.",
    name: "DTC beauty founder",
    result: "+71% conversion",
  },
  {
    quote:
      "They understood the commercial goal immediately. Every design decision had a reason—and the launch was genuinely smooth.",
    name: "Fashion brand director",
    result: "Launch in 5 weeks",
  },
  {
    quote:
      "Our customers noticed the difference on day one. The team found the balance between editorial and effortless shopping.",
    name: "Homeware co-founder",
    result: "+39% AOV",
  },
  {
    quote:
      "Fast, direct and unusually thoughtful. Open Limits felt less like a vendor and more like our in-house growth team.",
    name: "Wellness operator",
    result: "3.2× ROAS",
  },
];

const services = [
  ["01", "Shopify design", "High-converting storefronts with a point of view."],
  ["02", "Shopify development", "Fast, flexible builds your team can actually run."],
  ["03", "Brand systems", "A memorable identity that works from feed to checkout."],
  ["04", "Conversion growth", "Sharper journeys, smarter experiments, stronger numbers."],
];

function SectionWave({
  from,
  to,
  flip = false,
}: {
  from: string;
  to: string;
  flip?: boolean;
}) {
  return (
    <svg
      className={`section-wave ${flip ? "section-wave--flip" : ""}`}
      viewBox="0 0 1440 140"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{ background: from }}
    >
      <path
        d="M0,34 C180,112 328,112 472,62 C650,0 778,4 946,69 C1111,132 1269,115 1440,48 L1440,140 L0,140 Z"
        fill={to}
      />
    </svg>
  );
}

function Mark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <span />
      <span />
    </span>
  );
}

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <span className={diagonal ? "arrow arrow--diagonal" : "arrow"} aria-hidden="true">
      →
    </span>
  );
}

export default function Home() {
  const [filter, setFilter] = useState<"All" | Project["category"]>("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});

  const filteredProjects = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((project) => project.category === filter),
    [filter],
  );

  const openChat = () => {
    setChatOpen(true);
  };

  return (
    <main>
      <header className="site-header">
        <a className="logo" href="#top" aria-label="Open Limits home">
          <Mark />
          <span>OPEN LIMITS</span>
        </a>
        <nav className={menuOpen ? "nav nav--open" : "nav"} aria-label="Main navigation">
          <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#proof" onClick={() => setMenuOpen(false)}>Reviews</a>
          <button className="nav-cta" onClick={openChat}>
            Start a project <Arrow diagonal />
          </button>
        </nav>
        <button
          className="menu-button"
          onClick={() => setMenuOpen((value) => !value)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
        </button>
        <svg
          className="header-bottom-wave"
          viewBox="0 0 1440 78"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,17 C170,68 312,67 455,29 C624,-16 782,-4 943,38 C1133,88 1285,71 1440,28 L1440,0 L0,0 Z"
            fill="currentColor"
          />
        </svg>
      </header>

      <section
        className="hero hero-video"
        id="top"
        aria-label="Open Limits hero"
      >
        <div className="hero-video-frame">
          <video
            className="hero-video-media hero-video-media--desktop"
            src="https://res.cloudinary.com/dvtdzotx2/video/upload/q_auto,f_auto/open-limits/desktop-hero-award-winning-shopify-agency-1785017085626.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
          <video
            className="hero-video-media hero-video-media--mobile"
            src="https://res.cloudinary.com/dvtdzotx2/video/upload/q_auto,f_auto/open-limits/mobile-hero-award-winning-shopify-agency-1785017094922.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
          <div className="hero-video-shade" />
          <div className="hero-video-content">
            <div className="hero-slide__eyebrow">
              <span className="pulse" />
              Shopify website awards · 2023—2025
            </div>
            <h1>
              Stand out.
              <em>Sell louder.</em>
            </h1>
            <p>
              Open Limits is the award-winning Shopify website design agency for
              brands that want movement, memory and serious conversion energy.
            </p>
            <div className="hero-slide__actions">
              <a className="hero-slide__button" href="#work">
                See award-winning work <Arrow />
              </a>
              <button onClick={openChat}>
                Talk to the team <Arrow diagonal />
              </button>
            </div>
            <div className="hero-award-years" aria-label="Best website awards">
              <span><b>2023</b> Best website</span>
              <span><b>2024</b> Best website</span>
              <span><b>2025</b> Best website</span>
            </div>
          </div>
        </div>
        <svg
          className="hero-bottom-wave"
          viewBox="0 0 1440 132"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,90 C170,128 308,123 468,79 C652,28 796,27 965,76 C1140,126 1292,120 1440,74 L1440,132 L0,132 Z"
            fill="currentColor"
          />
        </svg>
      </section>

      <section className="work-section" id="work">
        <div className="section-intro">
          <div>
            <p className="kicker kicker--light">SELECTED WORK · 2023—2025</p>
            <h2>Built to be seen.<br />Designed to perform.</h2>
          </div>
          <p>
            First impressions matter. Explore the work, scan the results and visit
            any live experience that catches your eye.
          </p>
        </div>

        <div className="filters" role="group" aria-label="Filter projects">
          {(["All", "Beauty", "Food & Drink", "Lifestyle", "Pet Care"] as const).map((item) => (
            <button
              key={item}
              className={filter === item ? "filter filter--active" : "filter"}
              onClick={() => setFilter(item)}
            >
              {item}
              <sup>{item === "All" ? projects.length : projects.filter((p) => p.category === item).length}</sup>
            </button>
          ))}
        </div>

        <div className="project-grid">
          {filteredProjects.map((project, index) => (
            <article className="project-card" key={project.title}>
              <div className="project-media" style={{ background: project.color }}>
                {!brokenImages[project.title] ? (
                  <img
                    src={project.image}
                    alt={`${project.title} website screenshot`}
                    loading={index < 2 ? "eager" : "lazy"}
                    onError={() =>
                      setBrokenImages((state) => ({ ...state, [project.title]: true }))
                    }
                  />
                ) : (
                  <div className="project-placeholder">
                    <span className="mock-nav" />
                    <div className="mock-copy">
                      <small>OPEN LIMITS / {String(index + 1).padStart(2, "0")}</small>
                      <strong>{project.title}</strong>
                      <i />
                      <i />
                    </div>
                    <div className="mock-window">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                )}
                <div className="browser-bar">
                  <span />
                  <span />
                  <span />
                  <small>openlimits / work / {String(index + 1).padStart(2, "0")}</small>
                </div>
                <span className="project-number">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="project-details">
                <div>
                  <p>{project.category}</p>
                  <h3>{project.title}</h3>
                  <span>{project.blurb}</span>
                </div>
                <div className="project-result">
                  <strong>{project.metric}</strong>
                  {project.url ? (
                    <a href={project.url} target="_blank" rel="noreferrer">
                      Visit website <Arrow diagonal />
                    </a>
                  ) : (
                    <span className="pending-link">Live link coming soon</span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <SectionWave from="#111111" to="#b7ef66" flip />

      <section className="manifesto">
        <div className="manifesto-label">OUR POINT OF VIEW</div>
        <p>
          The internet has enough <span>fine.</span>
          <br />
          We make brands people <em>feel.</em>
        </p>
        <div className="manifesto-note">
          Distinctive by design. Commercial by nature. Built without the agency fog.
        </div>
      </section>

      <SectionWave from="#b7ef66" to="#f6f2ea" />

      <section className="services-section" id="services">
        <div className="services-head">
          <div>
            <p className="kicker">WHAT WE DO</p>
            <h2>One sharp team.<br />Every digital move.</h2>
          </div>
          <p>
            Strategy, design and development sit at the same table here. Less
            translation. Better ideas. Faster momentum.
          </p>
        </div>
        <div className="services-list">
          {services.map(([number, title, description]) => (
            <div className="service-row" key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
              <Arrow diagonal />
            </div>
          ))}
        </div>
        <div className="process-strip">
          <span>01 DISCOVER</span><b>→</b>
          <span>02 DEFINE</span><b>→</b>
          <span>03 DESIGN</span><b>→</b>
          <span>04 DELIVER</span>
        </div>
      </section>

      <SectionWave from="#f6f2ea" to="#6b4eff" flip />

      <section className="proof-section" id="proof">
        <div className="proof-head">
          <p className="kicker kicker--light">THE RECEIPTS</p>
          <h2>Big love.<br />Bigger results.</h2>
          <div className="proof-score">
            <strong>4.9</strong>
            <span>★★★★★<small>Across client reviews</small></span>
          </div>
        </div>
        <div className="reviews-grid">
          {reviews.map((review, index) => (
            <blockquote key={review.name}>
              <div className="quote-mark">“</div>
              <p>{review.quote}</p>
              <footer>
                <span>{review.name}</span>
                <strong>{review.result}</strong>
              </footer>
              <small>0{index + 1}</small>
            </blockquote>
          ))}
        </div>
        <div className="trust-row">
          <span>SHOPIFY PLUS</span>
          <span>KLAVIYO</span>
          <span>GROWTH PARTNER</span>
          <span>GLOBAL DELIVERY</span>
          <span>60+ LAUNCHES</span>
        </div>
      </section>

      <SectionWave from="#6b4eff" to="#ffb7db" />

      <section className="cta-section">
        <div className="cta-badge">NOW BOOKING<br />Q3 / Q4</div>
        <p>Have a brand with somewhere to go?</p>
        <h2>Let&apos;s make it<br /><em>impossible to ignore.</em></h2>
        <button className="button button--dark button--large" onClick={openChat}>
          Start your project <Arrow />
        </button>
        <div className="cta-small">Typical reply time: under 2 hours</div>
      </section>

      <SectionWave from="#ffb7db" to="#111111" flip />

      <footer className="footer">
        <div className="footer-top">
          <a className="logo logo--footer" href="#top">
            <Mark />
            <span>OPEN LIMITS</span>
          </a>
          <p>Shopify experiences for brands<br />with no interest in average.</p>
          <div className="footer-links">
            <a href="#work">Work</a>
            <a href="#services">Services</a>
            <a href="#proof">Reviews</a>
            <button onClick={openChat}>Email us</button>
          </div>
          <div className="footer-social">
            <a href="#" aria-label="Instagram">IG ↗</a>
            <a href="#" aria-label="Behance">BE ↗</a>
            <a href="#" aria-label="LinkedIn">LI ↗</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} OPEN LIMITS</span>
          <span>INDIA · WORKING WORLDWIDE</span>
          <a href="#top">BACK TO TOP ↑</a>
        </div>
      </footer>

      <LeadChat open={chatOpen} onOpenChange={setChatOpen} />
    </main>
  );
}
