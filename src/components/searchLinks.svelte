<script lang="ts">

    export let array= [""];
    export let configs = [{diameter: "", width: ""}];
    export let pcd = "";
    export let rims = [{rimId: "", brand: "", name: ""}];
    export let url ="";
</script>



    {#if pcd.length && configs[0].diameter.length}
        <div class="linksGrid">
            {#each configs as rim}
                <a href={`${url}/rim?diameter=${rim.diameter}&width=${rim.width}&pcd=${pcd}`} class="link">{`${rim.diameter}’’ - диаметр; ${rim.width} - ширина;
                ${pcd} - крепежные отверстия`}</a>
            {/each}
        </div>
    {:else if array.length >1}
        <div class="linksGrid">
            {#each array as el}
                <a href={`${url}/${el}`} class="link">{el}</a>
            {/each}
        </div>
    {:else if rims.length && rims[0].rimId.length}
        <div class="linksGrid">
            {#each rims as rim}
                <a href={`/rim-by-id/${rim.rimId}`} class="link">{rim.brand +" - "+rim.name}</a>
            {/each}
        </div>
    {:else}
        <div class="dontFind">
            <p>Диски не найдены</p>
        </div>
    {/if}  


<style>
    p{
        font-family: inherit;
        font-size: 18px;
        margin-top: 50px;
        color: #333333;
    }
    .dontFind{
        display: flex;
        justify-content: space-around;
        text-align: center;
    }
    a{
        text-decoration: none;
    }

    .link:hover{
        text-decoration: underline;
    }

    .link{
        cursor: pointer;
        margin: 8px;
        padding: 12px;
        height: auto;
        font-family: inherit;
        font-size: 16px;
        line-height: 18px;
        color: #507299;
    }
    .linksGrid{
        padding: 16px;
        display: grid;
        justify-content: space-around;
        grid-template-columns: auto auto auto;
        justify-items: center;
    }
</style>