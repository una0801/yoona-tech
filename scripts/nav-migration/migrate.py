"""목차 구조 개편 일회성 마이그레이션 (docs/superpowers/specs/2026-11-17-docs-navigation-redesign-design.md)

사용법 (저장소 루트에서)
  node scripts/nav-migration/dump-routes.mts scripts/nav-migration/old-routes.json
  python3 scripts/nav-migration/migrate.py --dry-run
  python3 scripts/nav-migration/migrate.py
"""
import json, os, re, subprocess, sys

ROOT = os.getcwd()
HERE = os.path.join(ROOT, "scripts/nav-migration")
OLD = {c["type"]: c["sections"] for c in json.load(open(os.path.join(HERE, "old-routes.json")))}
DRY = "--dry-run" in sys.argv


def is_leaf(n): return not n.get("items")


def node(t, *path):
    cur = {"items": OLD[t]}
    for p in path:
        cur = next(c for c in cur["items"] if c["title"] == p)
    return cur


def leaves(n): return [n] if is_leaf(n) else [x for c in n["items"] for x in leaves(c)]


def file_of(href):
    """대소문자 무시하고 실제 index.mdx 경로 반환 (없으면 None)"""
    cur = os.path.join(ROOT, "contents")
    for seg in href.strip("/").split("/"):
        if not os.path.isdir(cur):
            return None
        hit = [e for e in os.listdir(cur) if e.lower() == seg.lower()]
        if not hit:
            return None
        cur = os.path.join(cur, hit[0])
    f = os.path.join(cur, "index.mdx")
    return f if os.path.isfile(f) else None


# ---------- 새 구조 정의 ----------
# grp(label, docs, intro=옛 묶음 노드) / sec(title, slug, groups, intro=옛 노드)
def grp(label, docs, intro=None):
    return {"label": label, "docs": docs, "intro": intro}


def sec(title, slug, *groups, intro=None):
    return {"title": title, "slug": slug, "groups": list(groups), "intro": intro}


def whole(t, *p): return grp("", leaves(node(t, *p)))
def sub(t, label, *p, intro=False):
    n = node(t, *p)
    return grp(label, leaves(n), n if intro else None)
def direct(t, *p): return [c for c in node(t, *p)["items"] if is_leaf(c)]


NEW = {
    "cs": [
        sec("CS 기초", "fundamentals", whole("cs", "CS Fundamentals")),
        sec("자료구조", "structures", whole("cs", "Data Structures")),
        sec("알고리즘", "algorithms", whole("cs", "Algorithms")),
        sec("고급 알고리즘", "advanced-algo",
            sub("cs", "그래프", "Advanced Topics", "Graph Algorithms", intro=True),
            sub("cs", "문자열", "Advanced Topics", "String Algorithms", intro=True),
            sub("cs", "정수론", "Advanced Topics", "Number Theory", intro=True)),
        sec("고급 DP·자료구조", "advanced-ds",
            sub("cs", "DP", "Advanced Topics", "Advanced DP", intro=True),
            sub("cs", "자료구조", "Advanced Topics", "Advanced Data Structures", intro=True)),
        sec("네트워크", "networks", whole("cs", "Computer Networks")),
        sec("운영체제", "os", whole("cs", "Operating Systems")),
        sec("데이터베이스", "db", whole("cs", "Databases")),
        sec("컴퓨터 구조", "architecture", whole("cs", "Computer Architecture")),
        sec("시스템 설계: 확장·캐시·메시징", "system-design",
            sub("cs", "확장성", "System Design", "Scalability"),
            sub("cs", "캐싱", "System Design", "Caching"),
            sub("cs", "메시징", "System Design", "Messaging")),
        sec("시스템 설계: 신뢰성·사례", "reliability",
            sub("cs", "신뢰성", "System Design", "Reliability"),
            sub("cs", "분산 트랜잭션", "System Design", "Distributed Transactions"),
            sub("cs", "사례", "System Design", "Case Studies")),
    ],
    "backend": [
        sec("FastAPI", "fastapi",
            grp("", direct("backend", "Framework", "FastAPI")),
            sub("backend", "비동기", "Framework", "FastAPI", "Asynchronous", intro=True),
            intro=node("backend", "Framework", "FastAPI")),
        sec("Starlette", "starlette", grp("", leaves(node("backend", "Framework", "FastAPI", "Starlette"))),
            intro=node("backend", "Framework", "FastAPI", "Starlette")),
        sec("OOP·디자인 패턴", "oop",
            whole("backend", "OOP"),
            sub("backend", "생성 패턴", "Design Pattern", "Creational Pattern"),
            sub("backend", "아키텍처 패턴", "Design Pattern", "Architecture Pattern", intro=True)),
        sec("Python 객체 모델", "object-model",
            whole("backend", "Python Object Model"), sub("backend", "팩토리", "Python Factory")),
        sec("웹", "web", whole("backend", "Web")),
        sec("분산 시스템", "distributed",
            sub("backend", "기초", "Distributed Systems", "Foundations"),
            sub("backend", "일관성", "Distributed Systems", "Consistency Patterns"),
            sub("backend", "사례", "Distributed Systems", "Case Study")),
        sec("데이터 저장소", "datastore",
            whole("backend", "Database"), sub("backend", "Redis", "Redis"),
            sub("backend", "MongoDB", "Distributed Systems", "MongoDB Replica Set")),
        sec("메시징·작업 큐", "messaging",
            grp("Kafka", leaves(node("backend", "Distributed Systems", "Kafka")) + leaves(node("backend", "Kafka"))),
            sub("backend", "Celery", "Celery"), sub("backend", "Logstash", "Logstash")),
    ],
    "kubernetes": [
        sec("기초·구성요소", "basics",
            sub("devops", "기초", "Kubernetes", "basic", intro=True),
            sub("devops", "Control Plane", "Kubernetes", "Components", "Control Plane", intro=True),
            sub("devops", "Worker Node", "Kubernetes", "Components", "Worker Node", intro=True)),
        sec("워크로드·네트워크·스토리지", "workload",
            sub("devops", "워크로드", "Kubernetes", "Workload"),
            sub("devops", "네트워크", "Kubernetes", "Networking"),
            sub("devops", "스토리지", "Kubernetes", "Storage")),
        sec("실습", "hands-on", grp("", direct("devops", "Kubernetes", "Hands-on"))),
        sec("마이그레이션 실습", "migration", grp("", leaves(node("devops", "Kubernetes", "Hands-on", "migration")))),
    ],
    "aws": [
        sec(n, slug, grp("", leaves(node("devops", "AWS", t)))) for n, slug, t in [
            ("네트워킹 기초", "networking", "Networking & Foundations"),
            ("컴퓨팅", "compute", "Compute Services"),
            ("스토리지·DB", "storage", "Storage & Database"),
            ("IAM", "iam", "Identity & Access Management"),
            ("모니터링·로깅", "monitoring", "Monitoring & Logging"),
            ("DevOps·자동화", "automation", "DevOps & Automation"),
            ("네트워크 보안 심화", "security-deepdive", "Networking + Security Deep Dive"),
            ("고가용성·아키텍처 패턴", "architecture", "High Availability & Architecture Patterns"),
            ("실전 아키텍처 사례", "cases", "Practical Architecture Cases")]
    ],
    "ai": [
        sec("기초", "basics", whole("ai", "Overview"), sub("ai", "환경 설정", "Setup"), sub("ai", "용어", "Glossary")),
        sec("데이터·임베딩", "data", whole("ai", "Datasets"), sub("ai", "임베딩", "Embeddings"), sub("ai", "Vector DB", "Vector DB")),
        sec("RAG·추론·서빙", "rag", whole("ai", "RAG"), sub("ai", "추론", "Inference"), sub("ai", "서빙", "Serving"), sub("ai", "UI", "UI")),
    ],
    "code": [
        sec("Python 내장", "python", grp("", leaves(node("code", "Note", "Fundamentals for Python")))),
        sec("코딩테스트 풀이", "problems",
            sub("code", "Programmers", "Note", "Programmers"),
            sub("code", "Baekjoon", "Note", "baekjoon"),
            grp("패턴", leaves(node("cs", "Practice & Patterns")))),
    ],
}

# ---------- 새 href 계산 ----------
def last(href): return href.rstrip("/").split("/")[-1].lower()
def parent(href): return href.rstrip("/").split("/")[-2].lower()

mapping = {}          # 옛 href → 새 href (파일 있는 것만)
plan = {}             # 카테고리 → ROUTES 섹션 리스트
seen_old = set()
errors = []

for cat, sections in NEW.items():
    out_secs = []
    for s in sections:
        base = f"/{cat}/{s['slug']}"
        # 섹션 안 slug 충돌은 옛 부모 폴더 이름을 접두어로
        all_docs = [d for g in s["groups"] for d in g["docs"]]
        counts = {}
        for d in all_docs:
            counts[last(d["href"])] = counts.get(last(d["href"]), 0) + 1

        def slug_of(d):
            sl = last(d["href"])
            return f"{parent(d['href'])}-{sl}" if counts[sl] > 1 else sl

        def emit_doc(d):
            sl = slug_of(d)
            new = f"{base}/{sl}"
            if d["href"] in seen_old:
                errors.append(f"중복 배정 {d['href']}")
            seen_old.add(d["href"])
            if file_of(d["href"]):
                mapping[d["href"]] = new
            return {"title": d["title"], "href": f"/{sl}"}

        sec_node = {"title": s["title"], "href": f"/{s['slug']}", "noLink": True, "items": []}
        if s["intro"] is not None and file_of(s["intro"]["href"]):
            mapping[s["intro"]["href"]] = f"{base}/overview"
            sec_node["intro"] = "/overview"
        for g in s["groups"]:
            docs = [emit_doc(d) for d in g["docs"]]
            intro = None
            if g["intro"] is not None and file_of(g["intro"]["href"]):
                intro = "/" + last(g["intro"]["href"])
                mapping[g["intro"]["href"]] = f"{base}{intro}"
            if g["label"]:
                gn = {"title": g["label"], "href": "", "noLink": True, "items": docs}
                if intro:
                    gn["intro"] = intro
                sec_node["items"].append(gn)
            else:
                sec_node["items"].extend(docs)
        n_docs = len(all_docs)
        if n_docs > 12:
            errors.append(f"섹션 12개 초과 {cat}/{s['slug']} {n_docs}")
        out_secs.append(sec_node)
    if len(out_secs) > 12:
        errors.append(f"카테고리 섹션 12개 초과 {cat}")
    plan[cat] = out_secs

# 누락 검사: 옛 leaf 전부 배정됐는지
old_leaves = {l["href"] for secs in OLD.values() for s in secs for l in leaves(s)}
missing = old_leaves - seen_old
if missing:
    errors.append(f"배정 안 된 문서 {sorted(missing)}")

# 새 href 충돌 검사
news = list(mapping.values())
dups = {h for h in news if news.count(h) > 1}
if dups:
    errors.append(f"새 href 충돌 {sorted(dups)}")

# 고아 파일 (ROUTES 밖, 이동 안 함)
all_files = []
for dirpath, _, files in os.walk(os.path.join(ROOT, "contents")):
    if "index.mdx" in files and "/blogs" not in dirpath:
        all_files.append("/" + os.path.relpath(dirpath, os.path.join(ROOT, "contents")))
mapped_lower = {k.lower() for k in mapping}
orphans = sorted(f for f in all_files if f.lower() not in mapped_lower)

print(f"이동 {len(mapping)}개 / 파일 없는 ROUTES 문서 {len(seen_old) - len([k for k in mapping if k in seen_old])}개")
print("고아 파일(이동 안 함):", orphans)
if errors:
    print("ERROR", *errors, sep="\n  ")
    sys.exit(1)

json.dump(mapping, open(os.path.join(HERE, "map.json"), "w"), ensure_ascii=False, indent=1)
if DRY:
    for k, v in list(mapping.items())[:8]:
        print(" ", k, "→", v)
    sys.exit(0)

# ---------- 1. 파일 이동 ----------
def git(*a): subprocess.run(["git", *a], check=True, cwd=ROOT)

TMP = os.path.join(ROOT, "contents/.nav-migration-tmp")
# 2단계 이동: 옛 경로 → 임시 → 새 경로 (대소문자·중첩 폴더 충돌 회피)
moves = []
for i, (old, new) in enumerate(mapping.items()):
    src_dir = os.path.dirname(file_of(old))
    if src_dir == os.path.join(ROOT, "contents", new.strip("/")):
        continue
    tmp_dir = os.path.join(TMP, str(i))
    os.makedirs(tmp_dir, exist_ok=True)
    for e in os.listdir(src_dir):
        p = os.path.join(src_dir, e)
        if os.path.isfile(p):
            git("mv", p, os.path.join(tmp_dir, e))
    moves.append((tmp_dir, os.path.join(ROOT, "contents", new.strip("/"))))
for tmp_dir, dst in moves:
    os.makedirs(dst, exist_ok=True)
    for e in os.listdir(tmp_dir):
        git("mv", os.path.join(tmp_dir, e), os.path.join(dst, e))
# 빈 폴더 정리
for dirpath, dirs, files in sorted(os.walk(os.path.join(ROOT, "contents")), key=lambda x: -len(x[0])):
    if not os.listdir(dirpath):
        os.rmdir(dirpath)

# ---------- 2. 링크 치환 ----------
pairs = sorted(mapping.items(), key=lambda kv: -len(kv[0]))
def rewrite(text):
    for old, new in pairs:
        text = re.sub(re.escape(old) + r"(?![\w/-])", new, text, flags=re.IGNORECASE)
    return text

changed = 0
targets = [os.path.join(ROOT, "lib/quiz-static.json")]
for dirpath, _, files in os.walk(os.path.join(ROOT, "contents")):
    targets += [os.path.join(dirpath, f) for f in files if f.endswith(".mdx")]
for f in targets:
    t = open(f, encoding="utf-8").read()
    n = rewrite(t)
    if n != t:
        open(f, "w", encoding="utf-8").write(n)
        changed += 1
print("링크 치환 파일", changed)

# ---------- 3. routes-config ROUTES 교체 ----------
def ts(n, ind=4):
    pad = " " * ind
    parts = [f'title: {json.dumps(n["title"], ensure_ascii=False)}', f'href: {json.dumps(n["href"])}']
    if n.get("noLink"):
        parts.append("noLink: true")
    if n.get("intro"):
        parts.append(f'intro: {json.dumps(n["intro"])}')
    if "items" in n:
        inner = ",\n".join(ts(c, ind + 4) for c in n["items"])
        return f"{pad}{{\n{pad}  " + f",\n{pad}  ".join(parts) + f",\n{pad}  items: [\n{inner},\n{pad}  ],\n{pad}}}"
    return f"{pad}{{ " + ", ".join(parts) + " }"

body = "export const ROUTES = {\n" + "".join(
    f"  {cat}: [\n" + ",\n".join(ts(s) for s in secs) + ",\n  ],\n" for cat, secs in plan.items()) + "};\n"
rc = os.path.join(ROOT, "lib/routes-config.ts")
src = open(rc, encoding="utf-8").read()
start = src.index("export const ROUTES = {")
end = src.index("// ✅ 특정 타입의 ROUTES를 가져오는 함수")
head = src[:start].replace("// ✅ `/cs/`와 `/backend/`를 구분하여 하나의 객체로 저장\n", "")
open(rc, "w", encoding="utf-8").write(head + "// 카테고리 → 섹션 → [소분류(href \"\")] → 문서. URL은 /카테고리/섹션/문서 3단계 고정\n" + body + "\n" + src[end:])

# ---------- 4. 리다이렉트 ----------
redirects = [{"source": o, "destination": n} for o, n in mapping.items() if o != n]
redirects += [
    {"source": "/devops", "destination": "/kubernetes"},
    {"source": "/devops/kubernetes", "destination": "/kubernetes"},
    {"source": "/devops/aws", "destination": "/aws"},
]
json.dump(redirects, open(os.path.join(ROOT, "lib/redirects.json"), "w"), ensure_ascii=False, indent=1)
print("리다이렉트", len(redirects))
