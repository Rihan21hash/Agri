import { slugify } from "../utils/slugify";

function SectionPanel({ title, children, anchorId }) {
  const headingId = title
    ? anchorId
      ? `heading-${anchorId}`
      : `panel-${slugify(title)}`
    : undefined;
  const sectionId = anchorId ?? undefined;

  return (
    <section
      id={sectionId}
      className="scroll-mt-24 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card transition-shadow duration-300 hover:shadow-soft sm:p-8"
      aria-labelledby={headingId}
    >
      {title ? (
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-slate-100 pb-4">
          <h2
            id={headingId}
            className="font-display text-xl font-semibold tracking-tight text-slate-900"
          >
            {title}
          </h2>
        </div>
      ) : null}
      {children}
    </section>
  );
}

export default SectionPanel;
