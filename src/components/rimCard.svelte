<script lang="ts">
	import { page } from "$app/stores";
	import type { RimConfig } from "../types";

    export let rimId: string
    export let diameters: string[]
    export let price: number[]
    export let img: string
    export let brand: string
    export let name: string
    export let config: RimConfig[]

    let rimDiameters: string 
    let rimName: string
    let rimPrice: number

    let carBrand = $page.url.searchParams.get("brand") || "";
	let carModel = $page.url.searchParams.get("model") || "";
	let carYear = $page.url.searchParams.get("year") || "";

    let hrefString = carBrand.length >0 ? `/rim?id=${rimId}&diameter=${config[0].diameter}&width=${config[0].width}&pcd=${config[0].boltPattern}&carBrand=${carBrand}&carModel=${carModel}&carYear=${carYear}` : `/rim?id=${rimId}&diameter=${config[0].diameter}&width=${config[0].width}&pcd=${config[0].boltPattern}`
    
    $:{
        rimName = brand+" - "+name
        rimDiameters = diameters.length > 2 ? `${diameters[0]}-${diameters[diameters.length-1]}` : diameters.length === 2 ? `${diameters[0]}’’, ⌀${diameters[diameters.length-1]}` : diameters[0]
        rimPrice = price[0]
    }
</script>
    

<a href={hrefString}>
    <div class="rimCard">
        <div class="imgWrap">
            <img class="rimImage" src={img} alt="rim">
        </div>
        <div class="rimInfo">
            <p class="naming">{rimName}</p>
            <p class="price">от {rimPrice} грн</p>
            <p class="diameters">⌀{rimDiameters}’’</p>
        </div>
        <div class="orderBtn">Заказать</div>
    </div>
</a>



<style>
    .imgWrap{
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 236px;
        max-height: 236px;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }
    a{
        cursor: pointer;
        text-decoration: none;
    }
    .orderBtn:hover{
        opacity: 0.9;
    }
    .orderBtn{
        margin-bottom: 12px;
        padding: 8px 12px;
        width: 80%;
        font-family: inherit;
        font-size: 14px;
        letter-spacing: 0.5px;
        font-weight: 500;
        opacity: 1;
        border: none;
        border-radius: 4px;
        color: #fff;
        text-align: center;
        background-color:#507298;
    }
    .naming{
        margin-top: 8px;
        margin-bottom: 0px;
        font-size: 14px;
        text-overflow: ellipsis;
        overflow: hidden;
        color: #507299;
        letter-spacing: 0.5px;
    }
    .diameters{
        margin-top: 8px;
        margin-bottom: 0px;
        font-size: 10px;
        color: #808080;
        letter-spacing: 0.4px;
    }
    .price{
        margin-top: 4px;
        margin-bottom: 0px;
        font-size: 14px;
        font-weight: 700;
        color: #000;
        letter-spacing: 0.5px;
    }
    .rimInfo{
        padding: 0px 12px 12px;
        width: 90%;
        font-family: inherit;
    }
    .rimImage{
        width: 236px;
        height: auto;
    }
    .rimCard{
        margin-bottom: 16px;
        position: relative;
        width: 236px;
        height: 356px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        border-radius: 4px;
        box-shadow: #51739833 0px 2px 4px 0px;
        overflow: hidden;
        background-color: #fff;
    }
</style>