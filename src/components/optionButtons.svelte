<script lang="ts">
    export let number: number
    export let url: string
    const params = url.split('/')
</script>



<div class="header">
    <a href="/search" class="optionBtns">Все марки</a>
    <a href= {`/search/${params[2]}`} class="optionBtns {number <= 2 ? "hidden": "shown"}">Все модели</a>
    <a href={`/search/${params[2]}/${params[3]}`} class="optionBtns {number <= 3 ? "hidden": "shown"}">Все года</a>
    <a href={`/search/${params[2]}/${params[3]}/${params[4]}`} class="optionBtns {number <= 4 ? "hidden": "shown"}">Все конфигурации</a>
</div>


<style>
    .shown{
        display: inline-block;
    }
    .hidden{
        display: none;
    }
    .header{
        padding: 0px;
        width: 100%;
        min-height: 60px;
        height: auto;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
    }
    a{
        text-decoration: none;
    }
    .optionBtns:hover{
        text-decoration: underline;
    }
    .optionBtns{
        margin: 4px 2px;
        padding: 8px 16px;
        box-sizing: border-box;
        text-align: center;
        vertical-align: middle;
        min-height: 36px;
        height: auto;
        border-radius: 4px;
        border: none;
        font-family: inherit;
        font-size: 14px;
        letter-spacing: 0.1px;
        line-height: 20px;
        color: #364d66;
        background-color: #e4e8ed;
    }
</style>