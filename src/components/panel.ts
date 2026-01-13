export abstract class Panel {
    mouseMove: boolean = false;

    constructor(public collapsed: boolean, public contentWidth: number, public contentHeight: number) {
    }

    draggable(elem: HTMLElement) {
        let posX = 0, posY = 0, posX0 = 0, posY0 = 0;

        const drag_md = (e: MouseEvent) => {
            e.preventDefault();
            posX0 = posX = e.clientX;
            posY0 = posY = e.clientY;
            document.onmouseup = drag_mu;
            document.onmousemove = drag_mm;
        }

        const drag_mm = (e: MouseEvent) => {
            e.preventDefault();
            elem.style.left = (parseFloat(elem.style.left) - (posX - e.clientX)) + "px";
            elem.style.top = (parseFloat(elem.style.top) - (posY - e.clientY)) + "px";
            posX = e.clientX;
            posY = e.clientY;
        }

        const drag_mu = () => {
            document.onmouseup = null;
            document.onmousemove = null;
            if(Math.abs(posX - posX0) > 4 || Math.abs(posY - posY0) > 4) this.mouseMove = true;
        }
        
        elem.onmousedown = drag_md;
    }

    collapsible(elem: HTMLElement) {
        let panelContent = elem.nextElementSibling as HTMLElement;
        let arrow = elem.firstElementChild as HTMLElement;
        panelContent.style.width = this.contentWidth + "px";
        panelContent.style.height = this.collapsed ? "0px" : this.contentHeight + "px";
        const setArrow = (_collapsed: boolean) => arrow.setAttribute('data-before', this.collapsed ? '▸' : '▾');
        setArrow(this.collapsed);
        arrow.addEventListener("click", () => {
            if (this.mouseMove) {
                this.mouseMove = false;
                return;
            }
            if (!this.collapsed) panelContent.style.height = "0px";
            else {
                panelContent.style.height = this.contentHeight + "px";
                this.onOpen && this.onOpen();
            }
            this.collapsed = !this.collapsed;
            setArrow(this.collapsed);
        });
    }

    protected onOpen?(): void;
}