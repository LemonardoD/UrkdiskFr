<script>
    import Header from "../../components/header.svelte"
    import Footer from "../../components/footer.svelte"
    import Loader from "../../lib/icons/loader.svelte";
    import LoaderSmall from "../../lib/icons/loaderSmall.svelte";
    import { navigating } from "$app/stores";
	import { loading } from "$lib/loading";
    
    $: $loading = !!$navigating
    const loader =  typeof window !== 'undefined' && window.innerWidth > 750? Loader : LoaderSmall
</script>


<Header ifMain={false}/>
    <div class="loaderIndentation">
        {#if $loading}
            <svelte:component this={loader}/>
        {:else}
            <slot></slot>
        {/if}
    </div>
<Footer/>


<style>
    @media (min-width: 350px) and (max-width: 450px){
        .loaderIndentation{
            margin-top: 49px;
        }
    }
</style>