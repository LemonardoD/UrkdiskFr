<script>
    import Header from "../components/header.svelte"
    import Footer from "../components/footer.svelte"
	import { page } from "$app/stores";
</script>


<Header ifMain={false}/>
<div class="page">
    <div class="errContent">
        <p class="errMessage">Извините, что-то пошло не так. Попробуйте позже.</p>
    </div>
</div>
<Footer/>

<style>
    .page{
        margin: 0;
        display: flex;
        width: 100%;
        height: 30vh;
        text-align: center;
        justify-content: center;
    }
    .errContent{
        width: 80%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    p.errMessage{
        margin: 0;
        color: #7a8999;
        font-family: inherit;
        font-weight: 600;
        font-size: 42px;
    }
</style>




