<script>
    import Header from "../../components/header.svelte"
    import Footer from "../../components/footer.svelte"
    import Loader from "../../lib/icons/loader.svelte";
    import { navigating } from "$app/stores";
	// import { loading } from "$lib/loading";
    
    // $: $loading = !!$navigating
    const loader =  Loader
</script>


<Header ifMain={false}/>
<div class="loaderIndentation">
    <!-- {#if $loading}
        <div class="loaderWrap">
            <svelte:component this={loader}/>
        </div> 
    {:else} -->
        <slot></slot>
    <!-- {/if} -->
</div>
<Footer/>


<style>
    .loaderWrap{
        display: flex;
        min-height: 800px;
        align-items: center;
    }
    @media (min-width: 350px) and (max-width: 450px){
        .loaderWrap{
            min-height: 400px;
        }
        .loaderIndentation{
            margin-top: 49px;
        }
    }
</style>