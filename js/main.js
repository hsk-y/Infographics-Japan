function animateCount(element) {
    const target = parseInt(element.getAttribute('data-count')); // 目標のカウント
    let current = 0; // 現在のカウント
    const duration = 1000; // アニメーションの継続時間（ミリ秒）
    const startTime = performance.now(); // 開始時間

    function update() {
        const now = performance.now();
        const elapsedTime = now - startTime;
        const progress = Math.min(elapsedTime / duration, 1); // 0から1までの進捗率

        current = Math.floor(progress * target); // 現在のカウントを計算
        element.textContent = current.toLocaleString(); // カンマ区切りに変換

        if (progress < 1) {
            requestAnimationFrame(update); // アニメーションを継続
        } else {
            element.textContent = target.toLocaleString(); // 最終的に目標の値をセット
        }
    }

    requestAnimationFrame(update);
}

// IntersectionObserverを使って、info-dataが画面内に入ったらカウントアニメーションを実行
document.addEventListener('DOMContentLoaded', () => {
    const countElements = document.querySelectorAll('span[data-count]');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
            // スクロール領域に入った時にアニメーションを開始
            animateCount(entry.target); // 個々のspan要素に対してアニメーションを開始
            observer.unobserve(entry.target); // 一度実行したらその要素の監視を停止
            }
        });
    }, {
        threshold: 1.0 // 100%以上表示されたらアニメーションを開始
    });

    countElements.forEach(element => {
        observer.observe(element); // 各span要素を監視
    });
});