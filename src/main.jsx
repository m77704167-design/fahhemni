import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const demo = {
  type: "إشعار إداري",
  summary: "هذه وثيقة تحتوي على طلب لإتمام إجراء خلال مدة محددة.",
  action: "راجع الجهة المذكورة في الوثيقة وقدّم المستندات المطلوبة قبل الموعد النهائي.",
  deadline: "15 سبتمبر 2026",
  amount: "غير مذكور",
  documents: ["بطاقة التعريف الوطنية", "نسخة من الوثيقة الحالية"],
  next: "تحقق من عنوان الجهة وساعات الاستقبال ثم جهّز المستندات."
};

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const preview = useMemo(() => file ? URL.createObjectURL(file) : null, [file]);

  function analyze() {
    if (!file) return;
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setResult(demo);
      setLoading(false);
    }, 1200);
  }

  function chooseFile(e) {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setResult(null);
    }
  }

  return (
    <main>
      <nav className="nav">
        <div className="brand"><span className="brand-mark">ف</span> فهمّني</div>
        <button className="ghost">تسجيل الدخول</button>
      </nav>

      <section className="hero">
        <div className="badge">مساعد الوثائق الذكي • عربي / Français</div>
        <h1>صوّر الوثيقة،<br/><span>ونخبرك ماذا تفعل.</span></h1>
        <p>ارفع وثيقة أو فاتورة أو إشعارًا، واحصل على شرح مبسط، المواعيد المهمة، والمستندات المطلوبة.</p>

        <div className="workspace">
          <label className="dropzone">
            <input type="file" accept="image/*,.pdf" onChange={chooseFile} />
            <div className="upload-icon">↑</div>
            <strong>{file ? file.name : "اسحب الوثيقة هنا أو اضغط للاختيار"}</strong>
            <small>JPG, PNG أو PDF • حتى 10MB</small>
          </label>

          {preview && file?.type?.startsWith("image/") && (
            <img className="preview" src={preview} alt="معاينة الوثيقة" />
          )}

          <button className="primary" disabled={!file || loading} onClick={analyze}>
            {loading ? "جاري التحليل…" : "حلّل الوثيقة"}
          </button>
          <div className="privacy">🔒 في النسخة النهائية سنضيف حماية للملفات وسياسة خصوصية واضحة.</div>
        </div>
      </section>

      {result && (
        <section className="result">
          <div className="result-head">
            <div>
              <span className="eyebrow">نتيجة التحليل</span>
              <h2>{result.type}</h2>
            </div>
            <span className="ok">✓ تم التحليل</span>
          </div>

          <div className="cards">
            <article><span>ماذا يعني؟</span><p>{result.summary}</p></article>
            <article className="highlight"><span>ماذا أفعل؟</span><p>{result.action}</p></article>
            <article><span>الموعد المهم</span><p>{result.deadline}</p></article>
            <article><span>المبلغ</span><p>{result.amount}</p></article>
          </div>

          <div className="two">
            <article className="panel">
              <h3>📋 المستندات المطلوبة</h3>
              <ul>{result.documents.map((x, i) => <li key={i}>{x}</li>)}</ul>
            </article>
            <article className="panel next">
              <h3>➡️ الخطوة التالية</h3>
              <p>{result.next}</p>
              <button className="secondary">إضافة تذكير</button>
            </article>
          </div>

          <div className="disclaimer">هذه النتيجة تجريبية في هذه النسخة. لا تعتمد عليها وحدها لاتخاذ قرارات قانونية أو مالية أو صحية.</div>
        </section>
      )}

      <section className="features">
        <div><b>01</b><h3>افهم</h3><p>تحويل لغة الوثيقة إلى شرح واضح.</p></div>
        <div><b>02</b><h3>استخرج</h3><p>المبالغ والمواعيد والبيانات المهمة.</p></div>
        <div><b>03</b><h3>تحرّك</h3><p>خطوات عملية لما يجب فعله بعد ذلك.</p></div>
      </section>

      <footer>فهمّني © 2026 — نسخة أولية قابلة للتطوير</footer>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);