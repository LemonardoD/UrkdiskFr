<script lang="ts">
	import { tick } from "svelte";

    export let showModal: boolean
    
    const clickModal = () =>{
        showModal = !showModal;
    }

    $: {
        if (typeof document !== 'undefined') {
            tick().then(() => {
                document.body.style.overflow = showModal ? 'hidden' : "auto";
                document.body.style.margin = showModal ? '0 17px 0 0' : "0";
            });
        }
    }
</script>



{#if showModal}
  <!-- svelte-ignore a11y-click-events-have-key-events --><!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="overlay" on:click={clickModal}/>
    <div class={"modal"}>
        <div class="modalCard">
            <div class="header">
                <p class="headerTitle">НАШИ КОНТАКТЫ</p>
            </div>
            <div class="content">
                <div class="info">
                    <span>Наш e-mail:</span>
                    <a class="contactInfo"href="mailto:blokhvova@gmail.com">blokhvova@gmail.com</a>
                </div>
                <div style="margin-top: 16px;"class="info">
                    <span>Наши телефоны:</span> 
                    <a class="contactInfo" href="tel:+380503403726">(050) 340-37-26</a>
                </div>
                <button aria-label="submit-button" aria-labelledby="submit" class="searchByCarBtn" on:click={clickModal}>Закрыть</button>
            </div>
        </div>
    </div>
{/if}


<style>
    .searchByCarBtn:hover{
        opacity: 1;
    }
    .searchByCarBtn{
        margin-top: 26px;
        width: 100%;
        height: 36px;
        font-family:inherit;
        font-size: 14px;
        letter-spacing: 0.5px;
        font-weight: 500;
        opacity: 0.95;
        border: none;
        border-radius: 4px;
        color: #fff;
        background-color: #507298;
    }
    .contactInfo:hover{
        text-decoration: underline;
    }
    .contactInfo{
        text-decoration: none;
        color: #7a8999;
    }

    span{
        color: #00000099;
        font-family: inherit;
        font-size: 16px;
        font-weight: 500;
    }
    .headerTitle{
        color: #7a8999;
        font-family: inherit;
        font-size: 16px;
        margin: 18px;
    }
    .info{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .content{
        width: 302px;
        padding: 24px;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        background-color: #fff;
        -webkit-tap-highlight-color: #000;
        box-shadow: #00000040 0px 14px 45px, #00000038 0px 10px 18px;
    }
    .header{
        width: 100%;
        height: auto;
        font-family: inherit;
        background-color: #eceff1;
        border-top-right-radius: 4px;
        border-top-left-radius: 4px;
        border-bottom: 1px solid #c4c8cc;
        z-index: 2;
    }
    .modalCard{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 4px;
    }
    .overlay {
        overflow: hidden;
        z-index: 10;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #00000080;
        transition: all 2s ease;
    }

    .modal {
        border-radius: 4px;
        position: fixed;
        opacity: 0.7;
        top: 45%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;
        width: 350px;
        z-index: 1000;
        animation: floatIn 0.3s ease-in-out 0s forwards;
    }
    @keyframes floatIn {
        to {
            opacity: 1;
            top: 50%; 
        }
    }
</style>