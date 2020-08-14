<style>
  /* The loading Class */
  .loading {
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.2);
  }

  /* The moving element */
  .loading::after {
    display: block;
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    transform: translateX(-100%);
    background: -webkit-gradient(
      linear,
      left top,
      right top,
      from(transparent),
      color-stop(rgba(61, 61, 61, 0.2)),
      to(transparent)
    );

    background: linear-gradient(
      90deg,
      transparent,
      rgba(61, 61, 61, 0.2),
      transparent
    );

    /* Adding animation */
    animation: loading 0.8s infinite;
  }

  /* Loading Animation */
  @keyframes loading {
    100% {
      transform: translateX(100%);
    }
  }
</style>

<div class="loading" />
