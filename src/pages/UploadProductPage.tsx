import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Upload, X, ImagePlus, Sparkles, ChevronRight,
  Info, DollarSign, Tag, Package, MapPin, Truck,
  CheckCircle, Wand2
} from 'lucide-react';

const categories = [
  'Electronics', 'Fashion', 'Home & Garden', 'Sports',
  'Books & Media', 'Collectibles', 'Health & Beauty', 'Vehicles',
];

const conditions = [
  { value: 'new', label: 'New', desc: 'Brand new, unused, unopened' },
  { value: 'like-new', label: 'Like New', desc: 'Opened but never used' },
  { value: 'good', label: 'Good', desc: 'Used with minor wear' },
  { value: 'fair', label: 'Fair', desc: 'Used with visible wear' },
  { value: 'poor', label: 'Poor', desc: 'Heavy wear, parts may be missing' },
];

interface FormState {
  title: string;
  description: string;
  category: string;
  condition: string;
  price: string;
  originalPrice: string;
  quantity: string;
  tags: string;
  location: string;
  shippingPrice: string;
  shippingDays: string;
  images: File[];
}

export default function UploadProductPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(1);

  const [form, setForm] = useState<FormState>({
    title: '',
    description: '',
    category: '',
    condition: 'new',
    price: '',
    originalPrice: '',
    quantity: '1',
    tags: '',
    location: '',
    shippingPrice: '',
    shippingDays: '3',
    images: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleImages = (files: FileList | null) => {
    if (!files) return;
    const newFiles = Array.from(files).slice(0, 6 - form.images.length);
    const previews = newFiles.map(f => URL.createObjectURL(f));
    setForm(f => ({ ...f, images: [...f.images, ...newFiles] }));
    setImagePreviews(p => [...p, ...previews]);
  };

  const removeImage = (index: number) => {
    setForm(f => ({ ...f, images: f.images.filter((_, i) => i !== index) }));
    setImagePreviews(p => p.filter((_, i) => i !== index));
  };

  const handleAiGenerate = async () => {
    if (!form.title) return;
    setIsAiGenerating(true);
    await new Promise(r => setTimeout(r, 1800));
    setForm(f => ({
      ...f,
      description: `This is a premium ${f.title} in excellent condition. Perfect for enthusiasts and everyday users alike. Features high-quality construction, reliable performance, and a sleek modern design. Ships carefully packaged with all original accessories included.\n\nKey Features:\n• Excellent build quality\n• Full functionality verified\n• Clean and well-maintained\n• Ships within 1-2 business days`,
    }));
    setIsAiGenerating(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 2000));
    setIsSubmitting(false);
    setIsSuccess(true);
    setTimeout(() => navigate('/seller-dashboard'), 2000);
  };

  const steps = [
    { number: 1, label: 'Product Info' },
    { number: 2, label: 'Photos' },
    { number: 3, label: 'Pricing' },
    { number: 4, label: 'Shipping' },
  ];

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-surface-secondary flex items-center justify-center p-6">
        <div className="card p-12 text-center max-w-md w-full">
          <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="font-display font-bold text-2xl text-slate-900 mb-2">Product Listed!</h2>
          <p className="text-slate-500 mb-6">Your product has been submitted for review and will be live shortly.</p>
          <Link to="/seller-dashboard" className="btn-primary w-full justify-center">
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface-secondary min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
            <Link to="/seller-dashboard" className="hover:text-brand-600 transition-colors">Dashboard</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-800 font-medium">Add New Product</span>
          </div>
          <h1 className="font-display font-bold text-2xl text-slate-900">List a New Product</h1>
          <p className="text-slate-500 text-sm mt-1">Fill in the details below to get your product in front of millions of buyers.</p>
        </div>

        {/* Step indicators */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-5">
          <div className="flex items-center gap-0">
            {steps.map((step, i) => (
              <div key={step.number} className="flex items-center flex-1 last:flex-none">
                <button
                  onClick={() => setCurrentStep(step.number)}
                  className="flex items-center gap-2 shrink-0"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all
                                  ${step.number < currentStep ? 'bg-emerald-500 text-white' :
                                    step.number === currentStep ? 'bg-brand-600 text-white shadow-md' :
                                    'bg-slate-100 text-slate-400'}`}>
                    {step.number < currentStep ? '✓' : step.number}
                  </div>
                  <span className={`text-sm font-medium hidden sm:block ${step.number === currentStep ? 'text-brand-600' : 'text-slate-500'}`}>
                    {step.label}
                  </span>
                </button>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 ${step.number < currentStep ? 'bg-emerald-400' : 'bg-slate-100'}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">

            {/* ── Step 1: Product Info ── */}
            {currentStep === 1 && (
              <div className="card p-6 flex flex-col gap-5">
                <div className="flex items-center gap-2 mb-1">
                  <Tag className="w-5 h-5 text-brand-600" />
                  <h2 className="font-display font-semibold text-lg text-slate-900">Product Information</h2>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Product Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    name="title"
                    type="text"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="e.g. Sony WH-1000XM5 Wireless Noise Cancelling Headphones"
                    required
                    className="input-base"
                  />
                  <p className="text-xs text-slate-400 mt-1">Be specific and descriptive. Good titles include brand, model, and key features.</p>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Category <span className="text-rose-500">*</span>
                  </label>
                  <select name="category" value={form.category} onChange={handleChange} required className="input-base">
                    <option value="">Select a category</option>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                {/* Condition */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Condition <span className="text-rose-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                    {conditions.map(c => (
                      <label key={c.value} className="cursor-pointer">
                        <input
                          type="radio"
                          name="condition"
                          value={c.value}
                          checked={form.condition === c.value}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div className={`p-3 rounded-xl border-2 text-center transition-all
                                        ${form.condition === c.value
                                          ? 'border-brand-500 bg-brand-50'
                                          : 'border-slate-200 hover:border-slate-300'}`}>
                          <p className={`text-xs font-semibold ${form.condition === c.value ? 'text-brand-700' : 'text-slate-700'}`}>
                            {c.label}
                          </p>
                          <p className={`text-[10px] mt-0.5 leading-tight ${form.condition === c.value ? 'text-brand-500' : 'text-slate-400'}`}>
                            {c.desc}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-sm font-semibold text-slate-700">
                      Description <span className="text-rose-500">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={handleAiGenerate}
                      disabled={!form.title || isAiGenerating}
                      className="flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isAiGenerating ? (
                        <div className="w-3.5 h-3.5 border-2 border-brand-300 border-t-brand-600 rounded-full animate-spin" />
                      ) : (
                        <Wand2 className="w-3.5 h-3.5" />
                      )}
                      {isAiGenerating ? 'Generating...' : 'AI Generate'}
                    </button>
                  </div>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Describe your product in detail — features, dimensions, what's included, any defects..."
                    required
                    rows={6}
                    className="input-base resize-none"
                  />
                  <p className="text-xs text-slate-400 mt-1">
                    {form.description.length}/2000 characters. More detail = faster sales.
                  </p>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Tags</label>
                  <input
                    name="tags"
                    type="text"
                    value={form.tags}
                    onChange={handleChange}
                    placeholder="wireless, noise-cancelling, bluetooth (comma separated)"
                    className="input-base"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    <MapPin className="inline w-4 h-4 mr-1 text-slate-400" />
                    Item Location
                  </label>
                  <input
                    name="location"
                    type="text"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="e.g. New York, NY"
                    className="input-base"
                  />
                </div>

                <div className="flex justify-end">
                  <button type="button" onClick={() => setCurrentStep(2)} className="btn-primary">
                    Continue to Photos <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ── Step 2: Photos ── */}
            {currentStep === 2 && (
              <div className="card p-6 flex flex-col gap-5">
                <div className="flex items-center gap-2 mb-1">
                  <ImagePlus className="w-5 h-5 text-brand-600" />
                  <h2 className="font-display font-semibold text-lg text-slate-900">Product Photos</h2>
                </div>

                <div className="bg-brand-50 border border-brand-100 rounded-2xl p-4 flex items-start gap-3">
                  <Info className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-brand-700">
                    Upload up to 6 high-quality photos. Products with 4+ photos sell 3× faster. Use natural lighting and include multiple angles.
                  </p>
                </div>

                {/* Drop zone */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={e => e.preventDefault()}
                  onDrop={e => { e.preventDefault(); handleImages(e.dataTransfer.files); }}
                  className="border-2 border-dashed border-slate-200 hover:border-brand-400 rounded-2xl p-10 text-center cursor-pointer transition-colors group"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={e => handleImages(e.target.files)}
                  />
                  <Upload className="w-10 h-10 text-slate-300 group-hover:text-brand-400 mx-auto mb-3 transition-colors" />
                  <p className="font-semibold text-slate-700 mb-1">Drop photos here or click to upload</p>
                  <p className="text-sm text-slate-400">JPG, PNG, WEBP • Max 10MB each • Up to 6 photos</p>
                </div>

                {/* Previews */}
                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                    {imagePreviews.map((src, i) => (
                      <div key={i} className="relative group aspect-square">
                        <img src={src} alt={`Preview ${i + 1}`} className="w-full h-full object-cover rounded-xl" />
                        {i === 0 && (
                          <span className="absolute bottom-1 left-1 text-[10px] bg-brand-600 text-white px-1.5 py-0.5 rounded-md font-semibold">
                            Main
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => removeImage(i)}
                          className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-rose-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    {imagePreviews.length < 6 && (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="aspect-square rounded-xl border-2 border-dashed border-slate-200 hover:border-brand-400 flex items-center justify-center transition-colors"
                      >
                        <ImagePlus className="w-6 h-6 text-slate-300" />
                      </button>
                    )}
                  </div>
                )}

                <div className="flex justify-between">
                  <button type="button" onClick={() => setCurrentStep(1)} className="btn-secondary">
                    Back
                  </button>
                  <button type="button" onClick={() => setCurrentStep(3)} className="btn-primary">
                    Continue to Pricing <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ── Step 3: Pricing ── */}
            {currentStep === 3 && (
              <div className="card p-6 flex flex-col gap-5">
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="w-5 h-5 text-brand-600" />
                  <h2 className="font-display font-semibold text-lg text-slate-900">Pricing</h2>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Sale Price <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">$</span>
                      <input
                        name="price"
                        type="number"
                        value={form.price}
                        onChange={handleChange}
                        placeholder="0.00"
                        required
                        min="0"
                        step="0.01"
                        className="input-base pl-8"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Original / Compare Price
                      <span className="text-xs font-normal text-slate-400 ml-1">(optional)</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">$</span>
                      <input
                        name="originalPrice"
                        type="number"
                        value={form.originalPrice}
                        onChange={handleChange}
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        className="input-base pl-8"
                      />
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Shown as strikethrough. Useful for "was $X, now $Y" display.</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    <Package className="inline w-4 h-4 mr-1 text-slate-400" />
                    Quantity Available
                  </label>
                  <input
                    name="quantity"
                    type="number"
                    value={form.quantity}
                    onChange={handleChange}
                    min="1"
                    className="input-base w-32"
                  />
                </div>

                {/* Pricing tips */}
                <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <p className="text-sm font-semibold text-amber-800">AI Pricing Tip</p>
                  </div>
                  <p className="text-sm text-amber-700">
                    Similar items in this category sell for <strong>$280 – $420</strong>. Pricing competitively increases your chance of selling by 3×.
                  </p>
                </div>

                <div className="flex justify-between">
                  <button type="button" onClick={() => setCurrentStep(2)} className="btn-secondary">Back</button>
                  <button type="button" onClick={() => setCurrentStep(4)} className="btn-primary">
                    Continue to Shipping <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ── Step 4: Shipping ── */}
            {currentStep === 4 && (
              <div className="card p-6 flex flex-col gap-5">
                <div className="flex items-center gap-2 mb-1">
                  <Truck className="w-5 h-5 text-brand-600" />
                  <h2 className="font-display font-semibold text-lg text-slate-900">Shipping Options</h2>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Shipping Price</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">$</span>
                      <input
                        name="shippingPrice"
                        type="number"
                        value={form.shippingPrice}
                        onChange={handleChange}
                        placeholder="0.00 = Free shipping"
                        min="0"
                        step="0.01"
                        className="input-base pl-8"
                      />
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Leave empty or 0 for free shipping.</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Estimated Delivery (days)</label>
                    <select name="shippingDays" value={form.shippingDays} onChange={handleChange} className="input-base">
                      <option value="1">1 day (Express)</option>
                      <option value="2">2 days</option>
                      <option value="3">3 days (Standard)</option>
                      <option value="5">5 days</option>
                      <option value="7">7 days</option>
                      <option value="14">14 days (Economy)</option>
                    </select>
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                  <h3 className="font-semibold text-slate-800 text-sm mb-3">Listing Summary</h3>
                  <div className="grid grid-cols-2 gap-2.5 text-sm">
                    {[
                      { label: 'Title', value: form.title || '—' },
                      { label: 'Category', value: form.category || '—' },
                      { label: 'Condition', value: form.condition },
                      { label: 'Price', value: form.price ? `$${form.price}` : '—' },
                      { label: 'Quantity', value: form.quantity },
                      { label: 'Photos', value: `${imagePreviews.length} uploaded` },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between gap-2 py-1.5 border-b border-slate-100 last:border-0">
                        <span className="text-slate-500">{label}</span>
                        <span className="font-medium text-slate-800 text-right truncate">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between">
                  <button type="button" onClick={() => setCurrentStep(3)} className="btn-secondary">Back</button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary px-8 py-3"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Publish Product
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
