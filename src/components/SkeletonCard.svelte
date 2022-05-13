<div class="card p-0 skeloader h-200 shadow-lg" />

<style>
  @keyframes load {
    from {
      left: -100%;
    }

    to {
      left: 100%;
    }
  }
  .skeloader {
    position: relative;
    overflow: hidden;
  }

  .skeloader::before {
    will-change: left;
    content: '';
    position: absolute;
    height: 100%;
    width: 15rem;
    background: linear-gradient(to right, transparent 0%, #25282c 50%, transparent 100%);
    animation: load 1s infinite cubic-bezier(0.4, 0, 0.2, 1);
  }
</style>
