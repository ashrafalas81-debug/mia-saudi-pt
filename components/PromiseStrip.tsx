export default function PromiseStrip() {
  return (
    <section className="bg-white py-14 md:py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="relative bg-gradient-to-l from-navy to-royal rounded-3xl p-8 md:p-12 text-white text-center card-shadow overflow-hidden">
          <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-cyan/20 blur-3xl" />
          <svg viewBox="0 0 24 24" className="w-8 h-8 mx-auto mb-4 text-gold" fill="currentColor">
            <path d="M10 8c-3 1-5 3.5-5 7v1h5v-6H7.5C8 9 9 8.5 10 8.2V8zm9 0c-3 1-5 3.5-5 7v1h5v-6h-2.5c.5-1 1.5-1.5 2.5-1.8V8z" />
          </svg>
          <p className="text-xl md:text-2xl font-bold leading-relaxed mb-3">
            مهما كان مستواك الحالي، الرحلة مصممة ترفع جاهزيتك لأعلى درجة ممكنة.
          </p>
          <p className="text-silver/85 leading-8 max-w-2xl mx-auto">
            مراجعة شاملة لكل موادك الأساسية، وتأهيل عملي يساعدك تتعامل مع أول حالة حقيقية لك بثقة —
            الاجتياز والدرجات تعتمد على جهدك والتزامك، ونحن ننظم لك الطريق.
          </p>
        </div>
      </div>
    </section>
  );
}
