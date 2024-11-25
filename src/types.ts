export type BagData = {
    id: number;
    heading: string;
    subHeading: string;
    text: string;
    swatchColor: string;
    backgroundColor: string;
    headingColor: string;
    buttonColor: {
        text: string;
        background: string;
    };
    itemList ?: any
}