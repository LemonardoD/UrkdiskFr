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
        top: 64.2%;
        right: 6px;
        transform: translateY(-50%);
        height: 14px;
        width: 14px;
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
        margin-top: 8px;
        width: 100%;
        min-width: 100%;
        max-width: 100%;
        padding: 0px 8px;
        height: 30px;
        font-family: inherit;
        font-size: 13.6px;
        text-overflow: ellipsis;
        color: #364d66;
        border: none;
        border-radius: 2px;
        background-color: #ebf0f5;
        appearance: none;
        cursor: pointer;
    }
</style>