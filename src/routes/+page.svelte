<script lang="ts">
    import Header from "../components/header.svelte"
    import Footer from "../components/footer.svelte"
    import RimContent from "../components/rimContent.svelte"
    import CarSelector from "../components/carSelector.svelte"
    import searchImg from "../lib/icons/auto-search.webp"
    import searchIcon from "../lib/icons/search.png"
    import InziImage from "../lib/icons/inzi-rim.webp"
    import koseiImage from "../lib/icons/kosei-rim.webp"
    import MKWImage from "../lib/icons/mkw-rim.webp"
    import MarcImage from "../lib/icons/marcello-rim.webp"
    import InziIcon from "../lib/icons/inzi.webp"
    import koseiIcon from "../lib/icons/kosei.webp"
    import MarcIcon from "../lib/icons/marcello.webp"
    import MKWIcon from "../lib/icons/mkw.webp"
    import replicaImg from "../lib/icons/replica.webp"
    import Loader from "../lib/icons/loader.svelte"
	import { onMount } from "svelte";

    let loader = Loader
    let loaded = false

    export let data
    const {brands, popularRims} = data

    let inputValue = ''
    let isInputFocused = false;


    function toggleInputFocus() {
        isInputFocused = !isInputFocused;
        inputValue = isInputFocused ? inputValue : '';
    }

    onMount(() => {
        loaded = true
    });
</script>

{#if isInputFocused}
    <div class="dark-overlay"/>
{/if}
<Header ifMain={true}/>
    <div class="topBackground"/>
    <section class="searchSec">
        <search>
            <div style="display: flex; align-items: center;">
                <!-- svelte-ignore a11y-click-events-have-key-events --><!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                <img class="searchIcon" src={searchIcon} alt="Search">
                <input placeholder="Поиск по дискам" type="text" name="searchBar"
                bind:value={inputValue}
                on:focus={toggleInputFocus}
                on:blur={toggleInputFocus}>
                
            </div>
        </search>
        <div class="selectByCar">
            <div>
                <img class="selectImg" src={searchImg} alt="carSelect">
            </div>
            <CarSelector withHeader={true} brands={brands}/>
        </div>
    </section>
    <section class="rimMakers">
        <p class="mainTitle">Производители дисков</p>
        <div class="makers">
            <a href="/rims/Kosei">
                <div class="infoCard">
                    <div class="cardTitle">
                        <img  class="logoImage"src={koseiIcon} alt="Kosei">
                        <div class="allTitle">Посмотреть все</div>
                    </div>
                    <img  class="rimImages"src={koseiImage} alt="Kosei">
                </div>
            </a>
            <a href="/rims/Marcello">
                <div class="infoCard">
                    <div class="cardTitle">
                        <img  class="logoImage"src={MarcIcon} alt="Marcello">
                        <div class="allTitle">Посмотреть все</div>
                    </div>
                    <img  class="rimImages"src={MarcImage} alt="Marcello">
                </div>
            </a>
            <a href="/rims/MKW">
                <div class="infoCard">
                    <div class="cardTitle">
                        <img  class="logoImage"src={MKWIcon} alt="MKW">
                        <div class="allTitle">Посмотреть все</div>
                    </div>
                    <img  class="rimImages"src={MKWImage} alt="MKW">
                </div>
            </a>
            <a href="/rims/InziAone">
                <div class="infoCard">
                    <div class="cardTitle">
                        <img  class="logoImage"src={InziIcon} alt="InziAone">
                        <div class="allTitle">Посмотреть все</div>
                    </div>
                    <img  class="rimImages"src={InziImage} alt="InziAone">
                </div>
            </a>
        </div>
    </section>
    <section class="replicas">
        <a href="/rims/Replica">
            <div class="replicasCard">
                <img class="replicaImage"src={replicaImg} alt="replica">
                <div class="replicaText">
                    <p class="repTitle">Replica</p>
                    <p class="repText">Копии оригинальных дисков теперь у нас на сайте</p>
                    <div class="repBtn">Посмотреть все</div>
                </div>
            </div>
        </a>
    </section>
    <section class="popular">
        <p class="mainTitle">Популярные модели</p>
        {#if !loaded}
        <div class=loader>
            <svelte:component this={loader} />
        </div>
        {:else}
            <RimContent rimData={popularRims}/>
            <a href="/rims" class="showAllBtn">Показать еще</a>
        {/if}
    </section>
<Footer/>

<style>
    .loader{
        margin: 24px;
    }
    a{
        text-decoration: none;
    }
    .showAllBtn{
        text-decoration: none;
        padding: 14px;
        width: 488px;
        font-family: inherit;
        font-size: 14px;
        font-weight: 600;
        color: #425f80;
        line-height: 12px;
        letter-spacing: 0.5px;
        text-align: center;
        overflow: hidden;
        border: none;
        border-radius: 4px;
        background-color: #fff;
        box-shadow: #51739833 0px 2px 4px 0px;
    }
    .popular{
        padding-top: 22px;
        padding-bottom: 16px;
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #f0f0f0;
    }
    .repBtn{
        margin-top: 26px;
        padding: 10px;
        width: 170px;
        font-size: 14px;
        letter-spacing: 0.7px;
        font-weight: 400;
        opacity: 1;
        text-align: center;
        border-radius: 4px;
        color: #425f8f;
        background-color: #ebf1f4;
    }
    .repText{
        color: #333333;
        margin: 0;
        padding: 1px 60px;
        font-family: inherit;
        font-size: 20px;
        font-weight: 400;
        letter-spacing: 1.2px;
        text-align: center;
    }
    .repTitle{
        margin: 0px 0px 16px;
        font-family: inherit;
        font-size: 32px;
        font-weight: 700;
        letter-spacing: 1.2px;
        color: #000;
        text-align: center;
    }
    .replicaText{
        width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }
    .replicaImage{
        width: 464px;
        height: 200px;
    }
    .replicasCard{
        margin: 10px auto;
        padding: 36px 32px 16px;
        width: 960px;
        height: 200px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        background-color: #fff;
        border-radius: 4px;
        box-shadow:#51739833 0px 2px 4px 0px;
        overflow: hidden;
    }
    .replicas{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
        overflow: hidden;
        background-color: #f1f0f1;
    }
    .cardTitle{
        margin-top: 18px;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: center;
    }
    .logoImage{
        width: 130px;
        height: 28px;
    }
    a{
        cursor: pointer;
    }
    .allTitle:hover{
        background-color: #ebf1f4;
     }
    .allTitle{
        margin-top: 14px;
        align-items: center;
        justify-content: center;
        display: flex;
        width: 180px;
        height: 36px;
        font-family: inherit;
        font-size: 14px;
        font-weight: 600;
        color: #425f80;
        letter-spacing: 0.7px;
        text-align: center;
        border: none;
        border-radius: 4px;
        background-color: transparent;
        transition: duration 0s ease 0s, all 0.2s ease 0s;
        opacity: 1;
    }
    .rimImages{
        width: 184px;
        height: 152px;
        position: absolute;
        bottom: -4px;
        right: 0px;
    }
    .infoCard{
        position: relative;
        width: 236px;
        height: 260px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        background-color: #fff;
        border-radius: 4px;
        box-shadow: #51739833 0px 2px 4px 0px;
        overflow: hidden;
    }
    .mainTitle{
        width: 100%;
        margin: 0;
        font-family: inherit;
        font-size: 32px;
        line-height: 24px;
        letter-spacing: 1px;
        font-weight: 500;
        color: #333333;
        text-align: center;
    }

    .rimMakers{
        padding: 32px 0px 0px;
        width: 100%;
        height: 100%;
        min-height: 340px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        background-color: #f1f0f1;
        overflow: hidden;
    }

    ::placeholder{
        color: #a9a9a9;
    }

    search{
        margin: 42px 0px 8px;
        z-index:3;
    }
    input{
        width: 302px;
        height: 48px;
        border: none;
        padding-left: 60px;
        border-radius: 4px;
        font-family: inherit;
        font-size: 16px;
        letter-spacing: 0.6px;
        color: #333333;
        box-shadow: #00000033 0px 0px 4px 0px;
        outline: none;
    }
    .searchIcon {
        cursor: text;
        position: relative;
        left: 40px;
        height: 18px;
        width: 18px;
        z-index: 1;
        pointer-events: none;
    }
    .searchSec{
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-wrap: nowrap;
    }
    .selectImg{
        height: 166px;
        width:  166px;
    }
    .selectByCar{
        position: relative;
        padding: 24px 32px;
        width: 424px;
        height: 208px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background-color: white;
        border-radius: 4px;
        box-shadow: #00000033 0px 0px 4px 0px;
        z-index: 2;
    }
    .topBackground{
        height: 336px;
        z-index: 1;
        top: 0;
        left: 0;
        position: absolute;
        background: linear-gradient(0deg, #507299,#2d435c);
        width: 100%;
    }
    .dark-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #00000080;
        z-index: 3;
    }
    @media(max-width: 500px){
        .makers a{
            margin-top: 20px;
        }
        input{
            width: 80%;
        }
        .selectImg{
            display: none;
        }
        .selectByCar{
            width: 80%;
            padding: 32px;
            height: 210px;
            justify-content: center;
        }
        
        .showAllBtn{
            width: 60%;
        }
        .repBtn {
            margin: 0px 0px 8px 0px;
        }
        .repText{
            display: none;
        }
        .replicaImage{
            width: 264px;
            height: 120px;
        }
        .replicasCard{
            margin: 20px;
            width: 70%;
            height: auto;
            flex-direction: column-reverse;
            align-items: center;
        }
        .makers{ 
            padding: 0px;
            min-width: 236px;
            width: 90%;
            flex-direction: column;
        }
        .infoCard{
            justify-content: center;
            height: 160px;
            margin: 15px auto;
        }
        .cardTitle{
            z-index: 1;
        }
        .allTitle{
            background-color: #ebf1f4;
            z-index: 1;
        }
    }
    @media(min-width: 501px) and (max-width: 810px){
        .makers{ 
            display: flex;
            padding: 0px;
            min-width: 236px;
            width: 100%;
            flex-direction: column;
        }
        .infoCard{
            margin: 0px auto;
        }
    }
    @media(min-width: 811px) and (max-width: 1023px){
        .makers{
            width: 80%;
            display: grid;
            justify-content: space-around;
            column-gap: 16px;
            grid-template-columns: auto auto;
        }
    }
    @media(min-width: 501px) and (max-width: 1023px){
        .repBtn {
            display: none;
        }
        .replicaText{
            width: 100%;
        }
        .replicasCard{
            margin: 20px;
            padding: 14px;
            width: 90%;
            height: auto;
            flex-direction: column-reverse;
            align-items: center;
        }
        .showAllBtn{
            width: 60%;
        }
        .makers a{
            margin-top: 20px;
        }
        .cardTitle{
            padding-top: 0px;
            width: 170px;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
        }
        .infoCard{
            padding: 0px 0px 0px 8px;
            margin-bottom: 16px;
            width: 362px;
            height: 160px;
            flex-direction: row;
            justify-content: flex-start;
        }
    }
    @media(min-width: 1024px){
        .makers{ 
            padding: 32px 0px 0px;
            width: 100%;
            max-width: 1024px;
            display: grid;
            justify-content: space-around;
            column-gap: 16px;
            grid-template-columns: auto auto auto auto;
        }      
    }
</style>