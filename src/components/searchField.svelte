<script lang="ts">
    import drDownIcon from "../lib/icons/arrowDown.png"
    
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
        top: 24px;
        right: 8px;
        transform: translateY(-50%);
        height: 9.5px;
        width: 10px;
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
        font-weight: 400;
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