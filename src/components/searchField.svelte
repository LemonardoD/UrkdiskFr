<script lang="ts">
    import drDownIcon from "../lib/icons/down-arrow.png"
    
    export let array: string[] | number []
    export let change = ()=>{}
    export let disabledVal = ""

    export let selected = ""
</script>
<div class="selectContainer">
    <select bind:value={selected} on:change={change} disabled={selected.length ? false : array.length ? false : true}>
        {#if selected.length}
            <option value={selected}>{selected}</option>
        {:else}
            <option value="" disabled selected>{disabledVal}</option>
        {/if}
        {#each array as el}
            {#if el.toString() !== selected}
                <option value={el}>{el}</option>
            {/if}
        {/each}
    </select>
    <img  class="drDownIcon" src={drDownIcon} alt="select">
</div>



<style>
      .selectContainer {
        position: relative;
        width: 100%;
    }

    .drDownIcon {
        position: absolute;
        top: 50%;
        right: 4px;
        transform: translateY(-50%);
        height: 16px;
        width: 16px;
        pointer-events: none;
    }
    option{
        background-color: #fff;
    }
    select:disabled{
        opacity: 0.5;
        cursor: auto;
    }
    select{
        margin: 4px 0px;
        width: 100%;
        min-width: 100%;
        max-width: 100%;
        padding: 0px 8px;
        height: 30px;
        font-family: inherit;
        font-size: 13px;
        letter-spacing: 0px;
        text-overflow: ellipsis;
        color: #364d66;
        border: none;
        border-radius: 4px;
        background-color: #ebf1f4;
        appearance: none;
        overflow: auto;
        cursor: pointer;
        opacity: 0.8;
    }
</style>