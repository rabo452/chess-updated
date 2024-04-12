export default class VisualElement {
    public color: string;
    public onClick: (() => void) | undefined;

    constructor(color: string = "", onClick: (() => void) | undefined = undefined) {
        this.color = color;
        this.onClick = onClick;
    }
}
