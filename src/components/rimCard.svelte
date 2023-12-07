<script lang="ts">
    export let rimId: string
    export let diameter: string[]
    export let price: number[]
    export let img: string
    export let brand: string
    export let name: string
    let diameters = diameter.length > 1 ? `${diameter[0]}-${diameter[diameter.length-1]}` : diameter[0]
</script>

<a href={`/rim-by-id/${rimId}`}>
    <div class="rimCard">
        <div class="imgWrap">
            <img class="rimImage" src={img} alt="rim">
        </div>
        <div class="rimInfo">
            <p class="naming">{brand +" - "+name}</p>
            <p class="price">от {price[0]} грн</p>
            <p class="diameters">⌀{diameters}’’</p>
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