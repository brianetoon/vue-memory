<template>
    <nav class="main-nav">
        <div class="container">
            <div class="nav-content">
                <div class="logo">
                    <h1>Memory</h1>
                </div>
                <div class="nav-links">
                    <a href="">High Scores</a>
                    <a href="">Sign up</a>
                    <a href="">Log in</a>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {

}
</script>

<style>
.main-nav {
    background: white;
}
.nav-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.logo {
    font-size: 20px;
}
.nav-links > * {
    margin-left: 15px;
    font-size: 16px;
    font-weight: bold;
}
.nav-links > *:hover {
    color: var(--accent);
}
</style>