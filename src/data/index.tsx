import { BagData } from "../types";

export const data: BagData[] = [
    {
        id : 1,
        heading: 'Sandy Shores',
        subHeading : "Unwavering Beige Beauty",
        text:"It is versatile and neutral color that can be paired with variety of different colors.",
        swatchColor: '#E6D3C4',
        backgroundColor: '#E5E5E5',
        headingColor: '#000000',
        buttonColor : {text : '#000000', background : '#D7B172'},
        itemList : {
            bag:{
                color : "#e6d3c4",
            },
            strap:{
                color : "#5e2b17"
            },
            metal:{
                color : "#d7b172"
            }
        }
    },
    {
        id : 2,
        heading: 'Earthy Khaki',
        subHeading : "Chestnut with red tint",
        text:"The brown color is a warm and inviting color that can be used in a variety of different spaces.",
        swatchColor: '#4e4641',
        backgroundColor: '#79716c',
        headingColor: '#ffffff',
        buttonColor : {text : '#ffffff', background : '#774a37'},
        itemList: {
            bag: {
              color: '#774a37',
            },
            strap: {
              color: '#503830',
            },
            metal: {
              color: '#d4c5b5',
            },
        },
    },
    {
        id : 3,
        heading: 'Ocean Explorer',
        subHeading : "Ccean with coral tint",
        text:"The blue color is a cool and calming color that can be used in a variety of different spaces.",
        swatchColor: '#4f92b1',
        backgroundColor: '#c1d6e3',
        headingColor: '#1f333e',
        buttonColor : {text : '#ffffff', background : '#2f7393'},
        itemList: {
            bag: {
              color: '#2f7393',
            },
            strap: {
              color: '#1d1b1b',
            },
            metal: {
              color: '#F2F2F2',
            },
        },
    }
]