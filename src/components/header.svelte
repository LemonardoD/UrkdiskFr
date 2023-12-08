<script lang="ts">
    import logoIcon from "../lib/icons/logo.webp"
    import ContactModal from "../components/modals/modalContacts.svelte"

    export let ifMain: boolean
    let showModal = false;

    const clickModal = () =>{
        showModal = !showModal;
    }

</script>

<ContactModal bind:showModal={showModal}/>
<header class={ifMain ? "headerBar nonColored" : "headerBar colored"}>
    <div class="headerContent">
        <div>
            <a href="/">
                <div class="pageLogo">
                    <img  class="logoIcon" src={logoIcon} alt="Ukrdisk"/>
                    <p class="logoTitle">Ukrdisk</p>
                </div>
            </a>
        </div>
        <div>
            <button aria-label="Контакты-button" aria-labelledby="Контакты" class="contactBtn" on:click={clickModal}>Контакты</button>
        </div>
    </div>
</header>


<style>
    .contactBtn:hover {
        text-decoration: underline;
    }

    .contactBtn{
        cursor: pointer;
        padding: 16px 0px;
        height: 48px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        text-align: center;
        text-decoration: none;
        font-family: inherit;
        font-size: 16px;
        font-weight: 400;
        letter-spacing: 0.4px;
        color: white;
        background: transparent;
        border: none;
    }
    .colored{
        background-color: #517399;
        box-shadow: #0000004d 0px 1px 6px, #0000004d 0px 1px 4px;
    }
    .nonColored{
        background-color: transparent;
    }
    .headerBar{
        position: relative;
        top: 0px;
        width: 100%;
        height: 48px;
        display: flex;
        flex-direction: column-reverse;
        justify-content: space-between;
        align-items: center;
        z-index: 5;
    }
    a { 
        text-decoration: none;
    }
    .pageLogo{
        margin: 0;
        padding: 2px;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        color: #fff;
    }
    .logoTitle{
        margin: -4px 0px 0px 8px;
        font-family: "Rubik", sans-serif;
        font-size: 24px;
        font-weight: 400;
        letter-spacing: 0.9px;
        line-height: 48px;
        color: #fff;
        white-space: nowrap;
    }
    .logoIcon{
        height: 32px;
        width: 36px;
    }
    .headerContent{
        box-sizing: border-box;
        height: inherit;
        margin: 0px auto;
        width: 100%;
        padding: 0px 16px;
        max-width: 1024px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background-color: transparent;
    }
</style>