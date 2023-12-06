<script lang="ts">
    import CarSelector from "../components/carSelector.svelte"

    export let title: string
    export let brands: string[]
    export let diameters: string[]
</script>

<div class="card">
    <div class="cardContent">
        <div class="cardTitle">
            <p class="title">Литие диски {title}<br></p>
            <p class="text">Вы можете выбрать ваш автомобиль в фильтрах</p>
        </div>
        <div class="searchBycar">
            <div class="fieldTitle">Авто</div>
            <div class="fieldSection">
                <CarSelector withHeader={false} brands={brands}/>
            </div>
        </div>
        <div class="diameters">
            <div class="fieldTitle">Диаметр</div>
            <div class="fieldSection">
                {#each diameters as diameter}
                    <div class="diameterPick">
                        <input id={diameter} class="checkBox" type="checkbox" value={diameter} name={diameter}>
                        <label for={diameter}>{diameter}’’</label>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>


<style>
    .diameterPick{
        margin: 8px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    label{    
        width: 100%;
        font-family: inherit;
        font-size: 12px;
        color: #333333;
    }
    .checkBox{
        width: 14px;
        height: 14px;
        accent-color: #517399;
        border: 2px solid #517399;
        border-radius: 2px;
        margin-right: 4px;
    }

    .fieldSection{
        padding: 12px 16px 16px 16px;
        display: flex;
        align-items: center;
        flex-direction: column;
    }
    
    .text{
        margin: 6px 0px 4px 16px;
        color: #7d7d7d;
        font-size: 14px;
    }
    .title{
        font-family: inherit;
        letter-spacing: 0.3px;
        margin: 24px 0px 4px 16px;
        color: black;
        font-size: 20px;
    }

    .cardContent{
        padding: 0px;
        min-height: 220px;
        display: flex;
        background-color: white;
        border-radius: 4px;
        box-shadow: #0000001f 0px 1px 6px, #0000001f 0px 1px 4px;
    }

    .card{
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-color: #f0f0f0;
    }

    .fieldSection{
        padding: 12px 16px 16px 16px;
    }
    @media(max-width: 1024px){
        .text{
            text-align: center;
        }
        .card{
            margin: auto auto 16px auto;
            width: 90%;
        }
        .fieldSection{
            padding: 20px 8px;
            display: flex;
            align-items: center;
            flex-direction: row;
            justify-content: center;
        }
        .fieldTitle{
            text-align: center;
            padding: 8px 8px 8px 14px;
            font-family: inherit;
            font-size: 13px;
            color: #000000de;
            background-color: #f4f9fa;
        }
        
        .cardTitle{
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .searchBycar{
            width: 100%;
        }

        .diameters{
            width: 100%;
        }
        .cardContent{
            width: 90%;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        .diameterPick{
            width: 10%;
            margin: 4px;
        }
    }
    @media(min-width: 1025px){
        .diameterPick{
            width: 100%;
        }
        .title{
            width: 100%;
        }
        .fieldTitle{
            padding: 8px 8px 8px 14px;
            font-family: inherit;
            font-size: 13px;
            border-left: 2px solid #517399;
            color: #000000de;
            background-color: #f4f9fa;
        }
        .card{
            margin-top: 16px;
            margin-bottom: 16px;
            position: relative;
            width: 100%;
        }
        .searchBycar{
            width: 25%;
        }

        .diameters{
            width: 25%;
        }
        .cardTitle{
            width: 50%;
        }
        .cardContent{
            width: 1024px;
            flex-direction: row;
            justify-content: flex-start;
            align-items: flex-start;
        }
    }
    
   
</style>