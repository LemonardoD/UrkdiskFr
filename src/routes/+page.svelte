<script lang="ts">
    import Header from "../components/header.svelte"
    import Footer from "../components/footer.svelte"
    import RimContent from "../components/rimContent.svelte"
    import CarSelector from "../components/carSelector.svelte"
    import searchImg from "../lib/icons/auto-search.webp"
    import SearchIcon from "../lib/icons/search.svg"
    import InziImage from "../lib/icons/inzi-rim.webp"
    import koseiImage from "../lib/icons/kosei-rim.webp"
    import MKWImage from "../lib/icons/mkw-rim.webp"
    import MarcImage from "../lib/icons/marcello-rim.webp"
    import InziIcon from "../lib/icons/inzi.webp"
    import koseiIcon from "../lib/icons/Kosei.png"
    import MarcIcon from "../lib/icons/marcello.png"
    import MKWIcon from "../lib/icons/MKW.png"
    import replicaImg from "../lib/icons/replica.webp"
    import Loader from "../lib/icons/loader.svelte"
	import { onMount, tick } from "svelte";
	import { searchRims } from "$lib";
	import type { RimInfo } from "../types";
    import ReqCall from "../components/modals/modalReqCall.svelte";
    import AskQuestion from "../components/modals/modalAskQuestion.svelte";
    import questImg from "../lib/icons/questionsImg.webp";

    let loader = Loader
    let loaded = false

    export let data
    const {brands, popularRims} = data

    let userInput =''
    let inputValue = ''
    let isInputFocused = false;
    let searchResults: RimInfo[] =[]
    let showReqCall = false
    let showAskQuest = false
    let showMoreMakers = false

    const clickReqCall = () => {
        showReqCall =  !showReqCall;
    };
    const clickAskQuest = () => {
        showAskQuest =  !showAskQuest;
    };
    const onInput = () =>{
        inputValue = userInput
        isInputFocused = true;
        
    }
    const offInput = () =>{
        userInput = inputValue
        isInputFocused = false;
        inputValue =''
    }
    const handleInput = async (event: Event)=> {
        const inputEvent = event as InputEvent & { target: HTMLInputElement };
        inputValue = inputEvent.target.value;
        if(inputValue.length > 0){
            searchResults = await searchRims(inputValue)
        } else{
            searchResults =[]
        }
    }

    onMount(() => {
        loaded = true
    });

    $: {
        if (typeof document !== 'undefined') {
            tick().then(() => {
                document.body.style.overflow = isInputFocused ? 'hidden' : "auto";
                document.body.style.margin = isInputFocused ? '0 17px 0 0' : "0";
            });
        }
    }
</script>


<AskQuestion bind:showAskQuest = {showAskQuest}/>
<ReqCall bind:showReqCall = {showReqCall}/>

{#if isInputFocused}
  <!-- svelte-ignore a11y-click-events-have-key-events --><!-- svelte-ignore a11y-no-static-element-interactions --> 
    <div class="darkOverlay" on:click={offInput}>
        {#if searchResults.length > 0}
            <div class="searchResults">
                {#each searchResults as result }
                    <a class="searchResult" target="_blank" href={`/rim?id=${result.rimId}&diameter=${result.config[0].diameter}&width=${result.config[0].width}&pcd=${result.config[0].boltPattern}`}>
                        <div class="suggestedResult">
                            <img  class="suggestedImg" src={result.image} alt="rimImage">
                            <div class=suggestedInfo>
                                <p class="modelName">{result.name}</p>
                                <p class="modelPrice">{result.minPrice[0] >0 ? `от ${result.minPrice[0]}`: "Нет в наличии"}</p>
                            </div>
                        </div>
                    </a>
                {/each}
            </div>
        {/if}
    </div>
{/if}
<Header ifMain={true}/>
    <div class="topBackground"/>
    <section class="searchSec">
        <!-- svelte-ignore a11y-click-events-have-key-events --><!-- svelte-ignore a11y-no-noninteractive-element-interactions --><!-- svelte-ignore a11y-no-static-element-interactions -->
        <search on:click={onInput}>
            <img class="searchIcon" src={SearchIcon} alt="Search">
            <input placeholder="Поиск по дискам" type="text" name="searchBar"
            bind:value={inputValue}
            on:input={handleInput}>
        </search>
        <div class="selectByCar">
            <div style="margin-top: 6px;">
                <img class="selectImg" src={searchImg} alt="carSelect">
            </div>
            <CarSelector withHeader={true} brands={brands} rimBrand="all" byCar={false}/>
        </div>
    </section>
    <section class="rimMakers">
        <p class="mainTitle">Производители дисков</p>
        <div class="makers">
            <a href="/rims/Kosei?selectedDiameters=all">
                <div class="infoCard">
                    <div class="cardTitle">
                        <img  class="logoKosei"src={koseiIcon} alt="Kosei">
                        <div class="allTitle">Посмотреть все</div>
                    </div>
                    <img  class="rimImagesKosei"src={koseiImage} alt="Kosei">
                </div>
            </a>
            <a href="/rims/Marcello?selectedDiameters=all">
                <div class="infoCard">
                    <div class="cardTitle">
                        <img  class="logoMarcello"src={MarcIcon} alt="Marcello">
                        <div class="allTitle">Посмотреть все</div>
                    </div>
                    <img  class="rimImagesMarcello"src={MarcImage} alt="Marcello">
                </div>
            </a>
            <button class={`showMoreMakers ${!showMoreMakers ? "" : "hiden"}`} on:click={()=>{showMoreMakers = true}}>Показать еще 2</button>
            <a href="/rims/MKW?selectedDiameters=all">
                <div class={`infoCard ${showMoreMakers ? "" : "hiden"}`}>
                    <div class="cardTitle">
                        <img  class="logoMKW"src={MKWIcon} alt="MKW">
                        <div class="allTitle">Посмотреть все</div>
                    </div>
                    <img  class="rimImagesMKW"src={MKWImage} alt="MKW">
                </div>
            </a>
            <a href="/rims/InziAone?selectedDiameters=all">
                <div class={`infoCard ${showMoreMakers ? "" : "hiden"}`}>
                    <div class="cardTitle">
                        <img  class="logoInzi"src={InziIcon} alt="InziAone">
                        <div class="allTitle">Посмотреть все</div>
                    </div>
                    <img  class="rimImagesInzi"src={InziImage} alt="InziAone">
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
            <div style="margin-top: 2px;">
                <RimContent rimData={popularRims}/>
            </div>
            <a href="/rims?selectedDiameters=all" class="showAllBtn">Показать все</a>
        {/if}
    </section>
    <div class="orderInfo">
        <img class="questImg" src={questImg} alt="questionSection">
        <div class="infoText">
            <p class="t1">Есть вопрос?</p>
            <p class="t2">Мы с удовольствием ответим на все!</p>
            <button  class="order call" on:click={clickReqCall}>Заказать звонок</button>
            <button  class="order question" on:click={clickAskQuest}>Задать вопрос</button>
        </div>
    </div>
<Footer/>

<style>
    .orderInfo{
        display: none;
    }
    .searchResult:hover{
        background-color: #eceff1;
    }
    .modelPrice{
        margin: 0;
        display: block;
        width: 100%;
        line-height: 100%;
        height: 50%;
        font-size: 12px;
        color: #939393;
    }
    .modelName{
        margin: 0;
        font-family: inherit;
        font-size: 14px;
        height: 50%;
        width: 100%;
        line-height: 100%;
        color: #507299;
    }
    .suggestedInfo{
        width: 100%;
        margin-left: 10px;
    }
    .suggestedImg{
        height: 36px;
        width: 36px;
    }
    .suggestedResult{
        display: flex;
        padding: 4px 12px;
        height: 40px;
        justify-content: flex-start;
        align-items: center;
    }
    .searchResults{
        max-height: calc(55vh - 50px);
        top: 6.5%;
        margin-top: 8px;
        border-radius: 4px;
        display: flex;
        left: 50%;
        transform: translateX(-50%);
        position: relative;
        overflow: hidden;
        width: 380px;
        background-color: #fff;
        flex-direction: column;
    }
    .loader{
        margin: 24px;
    }
    a{
        text-decoration: none;
    }
    .showAllBtn{
        text-decoration: none;
        padding: 14px;
        width: 460px;
        font-family: inherit;
        font-size: 14px;
        font-weight: 500;
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
        padding-top: 14px;
        padding-bottom: 38px;
        width: 100%;
        height: auto;
        display: flex;
        letter-spacing: 0.7px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #f0f0f0;
    }
    .repBtn{
        margin-top: 27px;
        padding: 10px;
        width: 160px;
        font-size: 14px;
        letter-spacing: 0.5px;
        font-weight: 500;
        text-align: center;
        border-radius: 2px;
        color: #425f8f;
        background-color: #ebf0f5;
    }
    .repText{
        color: #000;
        margin: 0;
        padding: 1px 60px;
        font-family: inherit;
        font-size: 20px;
        letter-spacing: 1.2px;
        text-align: center;
    }
    .repTitle{
        margin: 0px 0px 15px;
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
        margin: 18px auto;
        padding: 36px 32px 16px;
        width: 928px;
        height: 196px;
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
        height: 78px;
        margin-top: 15px;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: center;
    }
    .logoKosei{
        width: 118px;
        height: 36px;
        margin-bottom: 8px;
    }
    .logoMarcello{
        margin-top: 3px;
        width: 118px;
        height: 29px;
        margin-bottom: 12px;
    }
    .logoMKW{
        margin-top: 3px;
        width: 118px;
        height: 30px;
        margin-bottom: 11px;
    }
    .logoInzi{
        margin-top: 7px;
        width: 118px;
        height: 20px;
        margin-bottom: 17px;
    }
    a{
        cursor: pointer;
    }
    .allTitle:hover{
        background-color: #ebf1f4;
     }
    .allTitle{
        margin-top: auto;
        align-items: center;
        justify-content: center;
        display: flex;
        width: 180px;
        height: 36px;
        font-family: inherit;
        font-size: 14px;
        font-weight: 500;
        color: #425f80;
        letter-spacing: 0.5px;
        text-align: center;
        border: none;
        border-radius: 2px;
        background-color: transparent;
        transition: duration 0s ease 0s, all 0.2s ease 0s;
        opacity: 1;
    }
    .rimImagesInzi{
        width: 183px;
        height: 152px;
        position: absolute;
        bottom: 0px;
        right: 0px;
    }
    .rimImagesMarcello{
        width: 178px;
        height: 152px;
        position: absolute;
        bottom: 0px;
        right: 0px;
    }
    .rimImagesMKW{
        width: 177px;
        height: 152px;
        position: absolute;
        bottom: 0px;
        right: 0px;
    }
    .rimImagesKosei{
        width: 184px;
        height: 150px;
        position: absolute;
        bottom: 0px;
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
        line-height: 38px;
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
        display: flex;
        align-items: center;
        margin: 42px auto 8px;
        z-index:3;
    }
    input{
        margin-right: 18px;
        position: relative;
        width: 310px;
        height: 47px;
        border: none;
        padding-top: 0px;
        padding-left: 50px;
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
        left: 34px;
        height: 18px;
        width: 18px;
        z-index: 1;
        pointer-events: none;
    }
    .searchSec{
        margin-top: 6px;
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-wrap: nowrap;
    }
    .selectImg{
        height: 165px;
        width:  165px;
    }
    .selectByCar{
        position: relative;
        padding: 24px 32px 24px 40px;
        width: 416px;
        height: 204px;
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
    .darkOverlay {
        overflow-x: hidden;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 2200px;
        background: #00000080;
        z-index: 3;
    }
   
       
    @media(min-width: 350px) and (max-width: 599px){
        .infoCard{
            padding: 0px 1px 0px 6px;
            margin: 0px auto;
            width: 350px;
            height: 160px;
            flex-direction: row;
            justify-content: flex-start;
            box-shadow:  0px 2px 4px 0 #51739833;
        }
    }
    
    @media(min-width: 400px) and (max-width: 1023px){
        .infoCard{
            width: 353px;
        }
    }
    @media(max-width: 600px){
        .searchIcon {

            position: absolute
        }
        .hiden{
            display: none;
        }
        .showMoreMakers{
            text-decoration: none;
            height: 40px;
            width: calc(100% - 20px);
            font-family: inherit;
            font-size: 14px;
            font-weight: 500;
            color: #425f80;
            letter-spacing: .5px;
            align-self: center;
            border: none;
            border-radius: 4px;
            background-color: #fff;
            box-shadow: #51739833 0px 2px 4px 0px;
            margin-top: 4px;
        }
        .questImg{
            width: 110px;
            height: 118px;
            margin-left: 12px;
        }
        .order:hover{
            opacity: 0.8;
        }
        .question{
            background-color: #ebf1f4;
            color: #425f8f;
            height: 32px;
        }
        .call{
            background-color: #507298;
            color: #fff;
            height: 32px;
        }
        .order{
            cursor: pointer;
            margin: 4px;
            font-family: inherit;
            font-size: 13px;
            letter-spacing: 0.5px;
            font-weight: 500;
            opacity: 1;
            border: none;
            height: 36px;
            border-radius: 2px;
        }
        .t2{
            text-align: start;
            width: 95%;
            font-size: 13px;
            color: #6a7785;
            letter-spacing: .5px;
            margin-top: 4px;
            margin-bottom: 3px;
        }
        .t1{
            font-weight: 500;
            letter-spacing: .6px;
            color: #425f80;
            text-align: start;
            font-size: 16px;
            margin-bottom: 0px;
            margin-top: 0px;
        }
        .infoText{
            width: calc(100% - 1rem - 115px);
            display: flex;
            flex-direction: column;
        }
        .orderInfo{
            width: calc(100% - 20px);
            align-items: center;
            display: flex;
            gap: 15.5px;
            height: 140px;
            margin: 14px auto 16px auto;
            padding: 12px 0px;
            object-fit: contain;
            border-radius: 4px;
            box-shadow: 0 2px 4px 0 #51739833;
            background-color: #fff;
        }
        .logoKosei{
            width: 138px;
            height: 42px;
            margin-bottom: 6.5px;
            margin-left: 1px;
        }
        .logoMarcello{
            margin-top: 3px;
            width: 140px;
            height: 34px;
            margin-bottom: 10px;
        }
        .logoMKW{
            margin-top: 3px;
            width: 140px;
            height: 36px;
            margin-bottom: 9.5px;
        }
        .logoInzi{
            margin-top: 7px;
            width: 140px;
            height: 24px;
            margin-bottom: 15px;
        }
        .allTitle{
            margin-left: 5px;
            margin-top: 0px;
            margin-bottom: 6px;
            background-color: #ebf1f4;
            z-index: 1;
        }
        .darkOverlay{
            width: 100%;
            height: 4961px;
        }
        .makers a{
            margin-top: 4px;
            margin-bottom: 4px;
        }
        .searchIcon{
            left: 30px;
        }
        ::placeholder {
            padding-left: 50px;
        }
        input{
            padding: 0;
            width: calc(100% - 20px);
            margin: 0px auto;
        }
        .selectImg{
            display: none;
        }
        .selectByCar{
            width: calc(100% - 20px);
            padding: 5px 0px 16px 0px;
            justify-content: center;
        }
        .mainTitle{
            font-size: 14px;
            letter-spacing: 0.5px;
            line-height: 17px;
            margin-bottom: 8px;
        }
        .rimMakers{
            padding: 57px 0px 0px;
        }
        .showAllBtn{
            width: 60%;
        }
        .repBtn {
            margin: 0px 0px 20px 0px;
        }
        .replicaText{
            width: 100%;
        }
        .repText{
            margin-top: 1px;
            padding: 0px 20px;
            margin-bottom: 28px;
        }
        .replicasCard{
            width: 100%;
            padding: 16px 0px 0px 0px ;
            margin: 44px auto 2px auto;
            height: auto;
            flex-direction: column-reverse;
            align-items: center;
            box-shadow:  0px 2px 4px 0 #51739833;
        }
        .makers{
            display: flex;
            padding: 0px;
            min-width: 236px;
            width: 100%;
            flex-direction: column;
        }
        .infoCard{
            padding: 0px 1px 0px 6px;
            margin: 0px auto;
            height: 160px;
            flex-direction: row;
            justify-content: flex-start;
            box-shadow:  0px 2px 4px 0 #51739833;
        }
        .cardTitle{
            margin-left: 2px;
            height: 160px;
            z-index: 1;
            flex-direction: column;
            align-items: flex-start;
        }
        .searchResults{
            top: 2.9%;
            width: 222px;
            transform: translateX(-55%);
        }
        .popular{
            display: none
        }
        .replicas a{
            width: calc(100% - 20px);
        }
        search{
            width: 100%;
            margin: 36px 0 8px
        }
    }
    @media(min-width: 501px) and (max-width: 810px){
        .darkOverlay{
            width: 100%;
            height: 3565px;
        }
        .searchResults{
            top: 4%;
        }
    }
    @media(min-width: 811px) and (max-width: 1023px){
        .searchResults{
            top: 5.1%;
        }
        .darkOverlay{
            height: 2800px;
        }
        .makers{
            display: flex;
            padding: 0px;
            min-width: 236px;
            width: 100%;
            flex-direction: column;
        }
    }
    @media(min-width: 601px) and (max-width: 1023px){
        .showMoreMakers{
            display: none;
        }
        .popular{
            padding-top: 12px;
        }
        .logoKosei{
            width: 138px;
            height: 42px;
            margin: 14px 0px 6px 29px;
        }
        .logoMarcello{
            margin: 14px 0px 6px 11px ;
            width: 174px;
            height: 42px;
        }
        .logoMKW{
            margin: 14px 0px 6px 16px ;
            width: 165px;
            height: 42px;
        }
        .logoInzi{
            margin: 18.5px 0px 10.5px 8px ;
            width: 180px;
            height: 31px;
        }
        .allTitle{
            margin-left: 13px;
            margin-top: 0px;
            margin-bottom: 6px;
            z-index: 1;
        }
        .rimMakers{
            padding: 24px 0px 0px
        }
        .repText{
            padding: 0 40px;
        }
        .repTitle{
            margin: 4px 0px 16px 0px;
        }
        .replicaText{
            width: 100%;
            padding-bottom: 38px;
        }
        .makers{
            width: 80%;
            display: grid;
            justify-content: space-around;
            column-gap: 16px;
            grid-template-columns: auto auto;
        }
        .replicasCard{
            margin: 52px 14px 20px 14px ;
            padding: 36px 32px 12px;
            width: 88%;
            height: 211px;
            align-items: center;
        }
        .repBtn{
            margin-top: 16px;
            padding: 9.5px 10px;
        }
        .replicaImage{
            width: 336px;
            height: 145px;
            margin-bottom: 11px;
        }
        .showAllBtn{
            width: 60%;
        }
        .mainTitle{
            margin-bottom: 8px;
        }
        .makers a{
            margin-top: 4px;
            margin-bottom: 4px;
        }
        .cardTitle{
            margin: 0;
            height: 160px;
            z-index: 1;
            flex-direction: column;
            align-items: flex-start;
        }
        .infoCard{
            padding: 0px;
            margin-bottom: 8px;
            width: 362px;
            height: 160px;
            flex-direction: row;
            justify-content: flex-start;
        }
    }
    @media(min-width: 1024px){
        .showMoreMakers{
            display: none;
        }
        .searchResults{
            max-height: calc(80vh - 50px);
        }
        .makers{ 
            padding: 12px 0px 0px;
            width: 100%;
            max-width: 992px;
            display: grid;
            justify-content: space-around;
            column-gap: 16px;
            grid-template-columns: auto auto auto auto;
        }      
    }
</style>