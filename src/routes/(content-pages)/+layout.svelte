<script>
    import Header from "../../components/header.svelte"
    import Footer from "../../components/footer.svelte"
</script>


<Header ifMain={false}/>
    <slot></slot>
<Footer/>
