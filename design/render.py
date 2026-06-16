#!/usr/bin/env python3
"""Cartographies of Light — Plate I. Rendered with PIL at 2x supersampling."""
import math, random
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

random.seed(41)
SS = 2
W, H = 2000 * SS, 2667 * SS
FONTS = "/Users/user/Library/Application Support/Claude/local-agent-mode-sessions/skills-plugin/7783e5c1-1aad-46bc-b271-4717dde58a5a/a2b0e593-985c-48a6-9671-f6e45cb52c72/skills/canvas-design/canvas-fonts"

# ---- palette (aged parchment plate) ----
GROUND   = (238, 225, 197)
GROUND_D = (224, 205, 168)
INK      = (43, 33, 22)
INK_SOFT = (96, 80, 58)
TURQ     = (31, 139, 130)
TERRA    = (177, 78, 44)
GOLD     = (201, 149, 46)
INDIGO   = (44, 62, 99)
PAPER_HI = (247, 239, 221)

def F(name, size):
    return ImageFont.truetype(f"{FONTS}/{name}", int(size * SS))

# ---------- ground ----------
base = Image.new("RGB", (W, H), GROUND)
# radial vignette toward warm edges
yy, xx = np.mgrid[0:H, 0:W]
cx, cy = W * 0.5, H * 0.44
d = np.sqrt((xx - cx) ** 2 + (yy - cy) ** 2) / (0.72 * math.hypot(W, H) / 2)
d = np.clip(d, 0, 1)
g = np.array(GROUND, float)
gd = np.array(GROUND_D, float)
field = (g[None, None] * (1 - d[..., None]) + gd[None, None] * d[..., None]).astype(np.uint8)
# fine paper grain
noise = (np.random.default_rng(7).normal(0, 5.0, (H, W, 1))).astype(np.int16)
field = np.clip(field.astype(np.int16) + noise, 0, 255).astype(np.uint8)
base = Image.fromarray(field, "RGB")
draw = ImageDraw.Draw(base, "RGBA")

def s(v):  # scale a final-space length into SS space
    return v * SS

# ---------- geometry helpers ----------
def pt(cx, cy, r, a):
    return (cx + r * math.cos(a), cy + r * math.sin(a))

def ring_pts(cx, cy, r, n, phase=0.0):
    return [pt(cx, cy, r, phase + 2 * math.pi * i / n) for i in range(n)]

def star_pts(cx, cy, ro, ri, points, phase=0.0):
    out = []
    for i in range(points * 2):
        r = ro if i % 2 == 0 else ri
        a = phase + math.pi * i / points
        out.append(pt(cx, cy, r, a))
    return out

def line(p1, p2, fill, w):
    draw.line([p1, p2], fill=fill, width=max(1, int(w * SS)))

def polyline(pts, fill, w, closed=True):
    pp = list(pts) + ([pts[0]] if closed else [])
    draw.line(pp, fill=fill, width=max(1, int(w * SS)), joint="curve")

def circle(cx, cy, r, outline=None, width=1, fill=None):
    draw.ellipse([cx - r, cy - r, cx + r, cy + r],
                 outline=outline, width=max(1, int(width * SS)) if outline else 0, fill=fill)

def dot(cx, cy, r, fill):
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=fill)

def petal(cx, cy, r0, r1, a, half, samples=24, fill=None, outline=INK, w=1.4):
    """A pointed leaf/petal centred on angle a, spanning ±half, from r0(base)→r1(tip)."""
    pts = []
    for i in range(samples + 1):
        t = i / samples
        rr = r0 + (r1 - r0) * math.sin(t * math.pi) ** 0.7
        aa = a - half + 2 * half * t
        pts.append(pt(cx, cy, rr, aa))
    # return along inner arc
    for i in range(samples + 1):
        t = 1 - i / samples
        aa = a - half + 2 * half * t
        pts.append(pt(cx, cy, r0, aa))
    if fill:
        draw.polygon(pts, fill=fill)
    polyline(pts, outline, w, closed=True)

# ===================================================================
# CENTRAL ROSETTE — the dome, charted from below
# ===================================================================
RCX, RCY = W * 0.5, s(1190)
R = s(690)          # outer radius
N = 16              # symmetry

# outer measurement rings (astrolabe)
circle(RCX, RCY, R, outline=INK, width=1.6)
circle(RCX, RCY, R - s(10), outline=INK_SOFT, width=1.0)
circle(RCX, RCY, R + s(34), outline=INK, width=1.2)
# degree ticks every 2°, long every 30°, with labels
for i in range(180):
    a = 2 * math.pi * i / 180 - math.pi / 2
    long = (i % 15 == 0)
    r1 = R + s(34)
    r0 = R + s(34) - (s(22) if long else s(10))
    line(pt(RCX, RCY, r0, a), pt(RCX, RCY, r1, a), INK if long else INK_SOFT, 1.2 if long else 0.8)
deg_font = F("DMMono-Regular.ttf", 13)
for k in range(12):
    a = 2 * math.pi * k / 12 - math.pi / 2
    p = pt(RCX, RCY, R + s(58), a)
    txt = f"{k*30:03d}"
    bb = draw.textbbox((0, 0), txt, font=deg_font)
    draw.text((p[0] - (bb[2]-bb[0]) / 2, p[1] - (bb[3]-bb[1]) / 2 - bb[1]), txt, font=deg_font, fill=INK_SOFT)

# Band 1 — inner arcade of pointed arches (the drum), 16 lobes
r_arc = R - s(30)
for i in range(N):
    a = 2 * math.pi * i / N - math.pi / 2
    half = math.pi / N
    petal(RCX, RCY, r_arc - s(150), r_arc, a, half * 0.92, fill=None, outline=INK, w=1.3)
# little keystone dots between arches
for i in range(N):
    a = 2 * math.pi * (i + 0.5) / N - math.pi / 2
    dot(*pt(RCX, RCY, r_arc - s(8), a), s(4), TERRA)

# Band 2 — ring of sixteen 8-point stars with connecting strapwork
r_star = R - s(250)
ro, ri = s(86), s(36)
star_centers = []
for i in range(N):
    a = 2 * math.pi * i / N - math.pi / 2
    scx, scy = pt(RCX, RCY, r_star, a)
    star_centers.append((scx, scy, a))
    sp = star_pts(scx, scy, ro, ri, 8, phase=a)
    polyline(sp, INK, 1.3, closed=True)
    # alternate star centres tinted
    if i % 2 == 0:
        draw.polygon(star_pts(scx, scy, ri * 1.5, ri * 0.6, 8, phase=a), fill=(*TURQ, 52))
    dot(scx, scy, s(5), GOLD if i % 4 == 0 else TERRA)
# strapwork: thin kite between neighbouring stars + radial tie to centre
for i in range(N):
    scx, scy, a = star_centers[i]
    ncx, ncy, na = star_centers[(i + 1) % N]
    mid = ((scx + ncx) / 2, (scy + ncy) / 2)
    # bowtie node between stars, pushed slightly outward
    bo = pt(RCX, RCY, r_star + s(30), 2 * math.pi * (i + 0.5) / N - math.pi / 2)
    bi = pt(RCX, RCY, r_star - s(30), 2 * math.pi * (i + 0.5) / N - math.pi / 2)
    polyline([
        pt(scx, scy, ro, a),  # placeholder replaced below
    ], INK, 1.0, closed=False) if False else None
    polyline([bi, (scx, scy), bo, (ncx, ncy), bi], INK_SOFT, 0.9, closed=False)

# Band 3 — turquoise petal ring (16)
r_pet = R - s(430)
for i in range(N):
    a = 2 * math.pi * i / N - math.pi / 2
    petal(RCX, RCY, r_pet - s(120), r_pet, a, math.pi / N * 0.8,
          fill=(*TURQ, 82) if i % 2 == 0 else None, outline=INK, w=1.2)

# Band 4 — terracotta diamonds (16) on a fine ring
r_dia = R - s(560)
circle(RCX, RCY, r_dia, outline=INK_SOFT, width=0.9)
for i in range(N):
    a = 2 * math.pi * i / N - math.pi / 2
    c = pt(RCX, RCY, r_dia, a)
    dpts = [pt(c[0], c[1], s(26), a + math.pi / 2 * k) for k in range(4)]
    draw.polygon(dpts, fill=(*TERRA, 85))
    polyline(dpts, INK, 1.0)

# Centre — saffron boss with 8-point star + 16-petal flower
r_core = R - s(600)
for i in range(N):
    a = 2 * math.pi * i / N - math.pi / 2
    petal(RCX, RCY, s(28), r_core, a, math.pi / N * 0.74, outline=INK, w=1.0)
circle(RCX, RCY, s(74), outline=INK, width=1.4, fill=(*GOLD, 105))
polyline(star_pts(RCX, RCY, s(60), s(24), 8, phase=-math.pi/2), INK, 1.3, closed=True)
draw.polygon(star_pts(RCX, RCY, s(34), s(13), 8, phase=0), fill=(*TERRA, 175))
dot(RCX, RCY, s(9), PAPER_HI)

# faint radial spokes (16) reaching from core ring to star band, behind — drawn thin
for i in range(N):
    a = 2 * math.pi * i / N - math.pi / 2
    line(pt(RCX, RCY, r_core + s(4), a), pt(RCX, RCY, r_star - ro, a), INK_SOFT, 0.6)

# ===================================================================
# CONSTELLATION OF EXCHANGE — nodes + trade routes in the corner field
# ===================================================================
nodes = [
    (0.135, 0.300, "I"), (0.300, 0.180, "II"), (0.860, 0.205, "III"),
    (0.880, 0.380, "IV"), (0.115, 0.560, "V"), (0.905, 0.560, "VI"),
    (0.205, 0.730, "VII"), (0.800, 0.735, "VIII"),
]
npos = []
for fx, fy, lab in nodes:
    npos.append((fx * W, fy * H, lab))

# route polyline threading the nodes (the Silk Road)
order = [0, 1, 2, 3, 5, 7, 6, 4, 0]
route = [(npos[i][0], npos[i][1]) for i in order]
# draw as faint dashed gold
def dashed(p1, p2, fill, w, dash=s(16), gap=s(12)):
    x1, y1 = p1; x2, y2 = p2
    L = math.hypot(x2 - x1, y2 - y1);
    if L == 0: return
    ux, uy = (x2 - x1) / L, (y2 - y1) / L
    t = 0
    while t < L:
        a = (x1 + ux * t, y1 + uy * t)
        b = (x1 + ux * min(t + dash, L), y1 + uy * min(t + dash, L))
        draw.line([a, b], fill=fill, width=max(1, int(w * SS)))
        t += dash + gap
for i in range(len(route) - 1):
    dashed(route[i], route[i + 1], (*GOLD, 185), 1.2)
# radial ties from a few nodes into the rosette rim
for idx in [0, 2, 6, 7]:
    nx, ny, _ = npos[idx]
    a = math.atan2(ny - RCY, nx - RCX)
    rim = pt(RCX, RCY, R + s(34), a)
    dashed((nx, ny), rim, (*GOLD, 120), 1.0)

# node markers + micro labels
nlab = F("Jura-Medium.ttf", 15)
ncoord = F("DMMono-Regular.ttf", 11)
for i, (nx, ny, lab) in enumerate(npos):
    circle(nx, ny, s(15), outline=INK, width=1.2)
    dot(nx, ny, s(6), TURQ if i % 3 else TERRA)
    circle(nx, ny, s(26), outline=INK_SOFT, width=0.7)
    # tiny crosshair
    line((nx - s(34), ny), (nx - s(20), ny), INK_SOFT, 0.7)
    line((nx + s(20), ny), (nx + s(34), ny), INK_SOFT, 0.7)
    draw.text((nx + s(30), ny - s(34)), lab, font=nlab, fill=INK)
    draw.text((nx + s(30), ny - s(14)), f"{random.randint(28,71):02d}'/{random.randint(10,69):02d}'", font=ncoord, fill=INK_SOFT)

# ===================================================================
# TYPOGRAPHY — header, phrase, legend, footer
# ===================================================================
MARG = s(150)
title = F("Italiana-Regular.ttf", 80)
sub   = F("Jura-Medium.ttf", 20)
plate = F("DMMono-Regular.ttf", 21)
serif_i = F("CrimsonPro-Italic.ttf", 34)
small = F("Jura-Medium.ttf", 17)
mono = F("IBMPlexMono-Regular.ttf", 16)

def rtext(x, y, t, fnt, fill):
    bb = draw.textbbox((0, 0), t, font=fnt)
    draw.text((x - (bb[2]-bb[0]), y), t, font=fnt, fill=fill)

# title — two lines, clearly above the rule
draw.text((MARG, s(104)), "CARTOGRAPHIES", font=title, fill=INK)
draw.text((MARG, s(186)), "OF  LIGHT", font=title, fill=INK)
# plate id top-right
rtext(W - MARG, s(112), "PLATE  I", plate, INK)
rtext(W - MARG, s(150), "AN  ATLAS  OF  EXCHANGE", small, INK_SOFT)
rtext(W - MARG, s(178), "MEASURED IN ROUTES & LIGHT", small, INK_SOFT)
# top rule, beneath the title block
draw.line([(MARG, s(298)), (W - MARG, s(298))], fill=INK, width=max(1, int(1.4 * SS)))
draw.line([(MARG, s(306)), (W - MARG, s(306))], fill=INK_SOFT, width=1)
# subtitle under rule
draw.text((MARG, s(320)), "A  STUDY  OF  MEANING  GATHERED  BENEATH  ONE  DOME", font=sub, fill=INK_SOFT)

# poetic phrase — lower field, centred
phrase = "every road of the old world once met beneath a single dome of light"
bb = draw.textbbox((0, 0), phrase, font=serif_i)
draw.text((W/2 - (bb[2]-bb[0])/2, s(2090)), phrase, font=serif_i, fill=INK)

# legend strip
ly = s(2230)
draw.line([(MARG, ly), (W - MARG, ly)], fill=INK_SOFT, width=1)
items = [("STAR", "node of origin", TERRA, "star"),
         ("ROUTE", "traced exchange", GOLD, "route"),
         ("FIELD", "tessellated order", TURQ, "field"),
         ("DOME", "centre of light", INK, "dome")]
seg = (W - 2 * MARG) / 4
for i, (k, d2, col, kind) in enumerate(items):
    x = MARG + seg * i + s(20)
    gy = ly + s(46)
    if kind == "star":
        polyline(star_pts(x + s(14), gy, s(15), s(6), 8), INK, 1.1)
        dot(x + s(14), gy, s(4), col)
    elif kind == "route":
        dashed((x, gy + s(13)), (x + s(30), gy + s(13)), (*GOLD, 200), 1.2, dash=s(8), gap=s(6))
    elif kind == "field":
        polyline([pt(x+s(14), gy, s(15), math.pi/2*j) for j in range(4)], INK, 1.1)
        draw.polygon([pt(x+s(14), gy, s(9), math.pi/2*j) for j in range(4)], fill=(*TURQ,90))
    else:
        circle(x + s(14), gy, s(14), outline=INK, width=1.2)
        dot(x + s(14), gy, s(5), col)
    draw.text((x + s(44), gy - s(20)), k, font=small, fill=INK)
    draw.text((x + s(44), gy + s(2)), d2, font=mono, fill=INK_SOFT)

# footer
fy = s(2470)
draw.line([(MARG, fy), (W - MARG, fy)], fill=INK, width=max(1, int(1.2*SS)))
draw.text((MARG, fy + s(16)), "41.31° N    69.28° E", font=mono, fill=INK)
mid = "C H O R S U"
bb = draw.textbbox((0,0), mid, font=small)
draw.text((W/2 - (bb[2]-bb[0])/2, fy + s(16)), mid, font=small, fill=INK)
rtext(W - MARG, fy + s(16), "ED. MMXXVI", mono, INK)

# corner registration ticks (plate marks)
for (mx, my) in [(MARG, s(250)+ s(0))]:
    pass
for cxk, cyk in [(s(70), s(70)), (W - s(70), s(70)), (s(70), H - s(70)), (W - s(70), H - s(70))]:
    line((cxk - s(18), cyk), (cxk + s(18), cyk), INK_SOFT, 1.0)
    line((cxk, cyk - s(18)), (cxk, cyk + s(18)), INK_SOFT, 1.0)
    circle(cxk, cyk, s(7), outline=INK_SOFT, width=0.8)

# ---------- finish: downscale + gentle sharpen ----------
final = base.resize((2000, 2667), Image.LANCZOS)
final = final.filter(ImageFilter.UnsharpMask(radius=1.2, percent=70, threshold=2))
final.save("/Users/user/Desktop/Chorsu/design/chorsu-plate-I.png")
print("saved chorsu-plate-I.png", final.size)
