#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = __dirname;
const TEMPLATE_ROOT = path.join(ROOT, "DistrictTemplate_12.x");

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function writeFile(p, content) {
  ensureDir(path.dirname(p));
  fs.writeFileSync(p, content.trimStart() + "\n", "utf8");
  console.log("📄 Created:", p);
}

console.log("🚀 Creating DistrictTemplate_12.x ...");

// ROOT
ensureDir(TEMPLATE_ROOT);

// index.js
writeFile(
  path.join(TEMPLATE_ROOT, "index.js"),
  `
  import { createEngine } from "./core/engine.js";
  import { createRegistry } from "./core/registry.js";
  import { createStore } from "./state/store.js";
  import { createEventBus } from "./state/eventBus.js";
  import { createWorkflowEngine } from "./workflows/workflowEngine.js";
  import { createAIPipeline } from "./AI/aiOrchestrator.js";
  import { createPanels } from "./PANELS/ImmersivePanel.js";
  import { createViews } from "./views/MainView.js";
  import moduleConfig from "./module.config.json" assert { type: "json" };

  export function bootstrapDistrict(runtimeConfig = {}) {
    const eventBus = createEventBus();
    const store = createStore({ eventBus });
    const registry = createRegistry({ store, eventBus });
    const workflows = createWorkflowEngine({ eventBus, store, registry });
    const ai = createAIPipeline({ eventBus, store, workflows });
    const engine = createEngine({ eventBus, store, registry, workflows, ai });
    const panels = createPanels({ engine, store, eventBus });
    const views = createViews({ engine, store, eventBus, panels });

    return {
      id: moduleConfig.id,
      name: moduleConfig.name,
      route: moduleConfig.route,
      type: moduleConfig.type,
      engine,
      store,
      eventBus,
      registry,
      workflows,
      ai,
      panels,
      views,
      config: moduleConfig,
      runtimeConfig
    };
  }
`
);

// module.config.json
writeFile(
  path.join(TEMPLATE_ROOT, "module.config.json"),
  `
{
  "id": "FE-XX",
  "name": "DISTRICT_NAME",
  "route": "/district",
  "type": "DISTRICT_TYPE",
  "version": "12.x",
  "description": "Engine-driven district template 12.x",
  "tags": ["engine", "event-driven", "ai", "workflows"]
}
`
);

// ACCESS
writeFile(
  path.join(TEMPLATE_ROOT, "access", "accessMatrix.json"),
  `
{
  "roles": ["guest", "citizen", "moderator", "admin"],
  "resources": {
    "dashboard": ["citizen", "moderator", "admin"],
    "adminPanel": ["admin"],
    "liveView": ["citizen", "moderator", "admin"],
    "workflows": ["moderator", "admin"]
  }
}
`
);

writeFile(
  path.join(TEMPLATE_ROOT, "access", "roles.json"),
  `
{
  "guest": {
    "label": "Guest",
    "description": "Unregistered visitor"
  },
  "citizen": {
    "label": "Citizen",
    "description": "Registered participant of the district"
  },
  "moderator": {
    "label": "Moderator",
    "description": "Helps maintain order and flow"
  },
  "admin": {
    "label": "Admin",
    "description": "Full control over the district"
  }
}
`
);

writeFile(
  path.join(TEMPLATE_ROOT, "access", "permissions.json"),
  `
{
  "view:dashboard": ["citizen", "moderator", "admin"],
  "view:live": ["citizen", "moderator", "admin"],
  "view:admin": ["admin"],
  "edit:workflows": ["moderator", "admin"],
  "edit:config": ["admin"]
}
`
);

// CORE: engine
writeFile(
  path.join(TEMPLATE_ROOT, "core", "engine.js"),
  `
  export function createEngine({ eventBus, store, registry, workflows, ai }) {
    const state = {
      started: false,
      lastTick: null
    };

    function start() {
      if (state.started) return;
      state.started = true;
      state.lastTick = Date.now();
      eventBus.emit("engine:started", { at: state.lastTick });
    }

    function stop() {
      if (!state.started) return;
      state.started = false;
      eventBus.emit("engine:stopped", { at: Date.now() });
    }

    function tick(context = {}) {
      if (!state.started) return;
      const now = Date.now();
      const delta = now - (state.lastTick || now);
      state.lastTick = now;

      const snapshot = store.getSnapshot();
      eventBus.emit("engine:tick", { now, delta, snapshot, context });

      workflows.run("heartbeat", {
        now,
        delta,
        snapshot,
        context
      });

      ai.process("heartbeat", {
        now,
        delta,
        snapshot,
        context
      });
    }

    function dispatch(action, payload = {}) {
      eventBus.emit("engine:action", { action, payload });
      store.dispatch(action, payload);
    }

    return {
      start,
      stop,
      tick,
      dispatch,
      getState: () => ({ ...state })
    };
  }
`
);

// CORE: registry
writeFile(
  path.join(TEMPLATE_ROOT, "core", "registry.js"),
  `
  export function createRegistry({ store, eventBus }) {
    const modules = new Map();

    function registerModule(id, definition) {
      if (modules.has(id)) {
        eventBus.emit("registry:warning", { id, reason: "already-registered" });
        return;
      }
      modules.set(id, definition);
      eventBus.emit("registry:registered", { id, definition });
    }

    function getModule(id) {
      return modules.get(id) || null;
    }

    function listModules() {
      return Array.from(modules.keys());
    }

    function invoke(id, method, ...args) {
      const mod = modules.get(id);
      if (!mod || typeof mod[method] !== "function") {
        eventBus.emit("registry:error", { id, method, reason: "not-found" });
        return null;
      }
      try {
        const result = mod[method](...args);
        eventBus.emit("registry:invoked", { id, method, args, result });
        return result;
      } catch (err) {
        eventBus.emit("registry:error", { id, method, error: String(err) });
        return null;
      }
    }

    store.registerSlice("registry", {
      getState: () => ({
        modules: listModules()
      })
    });

    return {
      registerModule,
      getModule,
      listModules,
      invoke
    };
  }
`
);

// CORE: state
writeFile(
  path.join(TEMPLATE_ROOT, "core", "state.js"),
  `
  export function createStateLayer({ store, eventBus }) {
    function setFlag(key, value) {
      store.update("core", (prev) => ({
        ...prev,
        flags: {
          ...(prev.flags || {}),
          [key]: value
        }
      }));
      eventBus.emit("core:flag:set", { key, value });
    }

    function setMeta(key, value) {
      store.update("core", (prev) => ({
        ...prev,
        meta: {
          ...(prev.meta || {}),
          [key]: value
        }
      }));
      eventBus.emit("core:meta:set", { key, value });
    }

    function getCoreState() {
      return store.getSlice("core") || {};
    }

    store.registerSlice("core", {
      getState: () => ({
        flags: {},
        meta: {}
      })
    });

    return {
      setFlag,
      setMeta,
      getCoreState
    };
  }
`
);

// ADMIN
writeFile(
  path.join(TEMPLATE_ROOT, "ADMIN", "AdminPanel.js"),
  `
  import { hasAccess } from "../utils/permissions.js";

  export function createAdminPanel({ store, eventBus }) {
    function getOverview(user) {
      if (!hasAccess(user, "view:admin")) {
        return { allowed: false, reason: "forbidden" };
      }

      const snapshot = store.getSnapshot();
      return {
        allowed: true,
        snapshot
      };
    }

    function updateConfig(user, patch) {
      if (!hasAccess(user, "edit:config")) {
        return { ok: false, reason: "forbidden" };
      }

      store.update("config", (prev) => ({
        ...prev,
        ...patch
      }));

      eventBus.emit("admin:config:updated", { patch });

      return { ok: true };
    }

    return {
      getOverview,
      updateConfig
    };
  }
`
);

writeFile(
  path.join(TEMPLATE_ROOT, "ADMIN", "AdminRoutes.js"),
  `
  export function registerAdminRoutes({ registry }) {
    registry.registerModule("admin:routes", {
      getRoutes() {
        return [
          {
            path: "/admin",
            component: "AdminPanel",
            secure: true
          }
        ];
      }
    });
  }
`
);

// ANALYTICS
writeFile(
  path.join(TEMPLATE_ROOT, "ANALYTICS", "analyticsEngine.js"),
  `
  export function createAnalyticsEngine({ eventBus, store }) {
    const events = [];

    function track(eventName, payload = {}) {
      const entry = {
        event: eventName,
        payload,
        at: Date.now()
      };
      events.push(entry);
      eventBus.emit("analytics:tracked", entry);
    }

    function getEvents(filter = {}) {
      return events.filter((e) => {
        if (filter.event && e.event !== filter.event) return false;
        if (filter.since && e.at < filter.since) return false;
        return true;
      });
    }

    store.registerSlice("analytics", {
      getState: () => ({
        count: events.length
      })
    });

    return {
      track,
      getEvents
    };
  }
`
);

writeFile(
  path.join(TEMPLATE_ROOT, "ANALYTICS", "metrics.json"),
  `
{
  "metrics": [
    { "id": "activeUsers", "label": "Active Users", "type": "gauge" },
    { "id": "eventsPerMinute", "label": "Events / Minute", "type": "rate" },
    { "id": "aiDecisions", "label": "AI Decisions", "type": "counter" }
  ]
}
`
);

writeFile(
  path.join(TEMPLATE_ROOT, "ANALYTICS", "dashboards", "overview.js"),
  `
  export function buildAnalyticsOverview({ analyticsEngine }) {
    const now = Date.now();
    const lastMinute = now - 60_000;

    const recentEvents = analyticsEngine.getEvents({ since: lastMinute });

    return {
      totalEvents: recentEvents.length,
      byType: recentEvents.reduce((acc, e) => {
        acc[e.event] = (acc[e.event] || 0) + 1;
        return acc;
      }, {})
    };
  }
`
);

// AI
writeFile(
  path.join(TEMPLATE_ROOT, "AI", "aiOrchestrator.js"),
  `
  import { createBaseAgent } from "./agents/baseAgent.js";

  export function createAIPipeline({ eventBus, store, workflows }) {
    const baseAgent = createBaseAgent({ eventBus, store, workflows });

    const pipelines = {
      heartbeat: [
        (ctx) => baseAgent.observe(ctx),
        (ctx) => baseAgent.evaluate(ctx),
        (ctx) => baseAgent.act(ctx)
      ]
    };

    function process(pipelineName, context = {}) {
      const steps = pipelines[pipelineName];
      if (!steps) {
        eventBus.emit("ai:pipeline:missing", { pipelineName });
        return null;
      }

      let ctx = { ...context, pipeline: pipelineName };
      for (const step of steps) {
        try {
          ctx = step(ctx) || ctx;
        } catch (err) {
          eventBus.emit("ai:pipeline:error", {
            pipelineName,
            step: step.name || "anonymous",
            error: String(err)
          });
        }
      }

      eventBus.emit("ai:pipeline:completed", {
        pipelineName,
        context: ctx
      });

      return ctx;
    }

    return {
      process
    };
  }
`
);

writeFile(
  path.join(TEMPLATE_ROOT, "AI", "agents", "baseAgent.js"),
  `
  export function createBaseAgent({ eventBus, store, workflows }) {
    function observe(ctx) {
      const snapshot = store.getSnapshot();
      return { ...ctx, snapshot };
    }

    function evaluate(ctx) {
      const { snapshot } = ctx;
      const load = snapshot.analytics?.count || 0;
      const mood = load > 100 ? "overloaded" : "stable";

      return { ...ctx, ai: { mood, load } };
    }

    function act(ctx) {
      const { ai } = ctx;
      if (!ai) return ctx;

      if (ai.mood === "overloaded") {
        workflows.run("throttle", { reason: "ai-overload", load: ai.load });
      }

      eventBus.emit("ai:decision", { ai });

      return ctx;
    }

    return {
      observe,
      evaluate,
      act
    };
  }
`
);

writeFile(
  path.join(TEMPLATE_ROOT, "AI", "prompts", "basePrompt.txt"),
  `
You are the orchestration layer of a digital district called "DISTRICT_NAME".
You observe events, state, and workflows, and propose actions that keep the district healthy, fair, and alive.
`
);

// PANELS
writeFile(
  path.join(TEMPLATE_ROOT, "PANELS", "HUDPanel.js"),
  `
  export function createHUDPanel({ store }) {
    function getHUDState() {
      const snapshot = store.getSnapshot();
      return {
        coreFlags: snapshot.core?.flags || {},
        mood: snapshot.ai?.mood || "unknown"
      };
    }

    return {
      getHUDState
    };
  }
`
);

writeFile(
  path.join(TEMPLATE_ROOT, "PANELS", "OverlayPanel.js"),
  `
  export function createOverlayPanel({ eventBus }) {
    const messages = [];

    function push(message) {
      messages.push({
        id: messages.length + 1,
        message,
        at: Date.now()
      });
      eventBus.emit("overlay:message", { message });
    }

    function list() {
      return [...messages];
    }

    return {
      push,
      list
    };
  }
`
);

writeFile(
  path.join(TEMPLATE_ROOT, "PANELS", "ImmersivePanel.js"),
  `
  import { createHUDPanel } from "./HUDPanel.js";
  import { createOverlayPanel } from "./OverlayPanel.js";

  export function createPanels({ engine, store, eventBus }) {
    const hud = createHUDPanel({ store });
    const overlay = createOverlayPanel({ eventBus });

    function getImmersiveState() {
      return {
        engine: engine.getState(),
        hud: hud.getHUDState(),
        overlay: overlay.list()
      };
    }

    return {
      hud,
      overlay,
      getImmersiveState
    };
  }
`
);

// FORMS
writeFile(
  path.join(TEMPLATE_ROOT, "FORMS", "formSchemas.json"),
  `
{
  "sampleForm": {
    "id": "sampleForm",
    "title": "Sample District Form",
    "fields": [
      { "id": "name", "label": "Name", "type": "text", "required": true },
      { "id": "role", "label": "Role", "type": "select", "options": ["guest", "citizen", "moderator", "admin"] }
    ]
  }
}
`
);

writeFile(
  path.join(TEMPLATE_ROOT, "FORMS", "validators.js"),
  `
  export function validateForm(schema, data) {
    const errors = [];

    for (const field of schema.fields || []) {
      const value = data[field.id];

      if (field.required && (value === undefined || value === null || value === "")) {
        errors.push({ field: field.id, reason: "required" });
      }
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }
`
);

writeFile(
  path.join(TEMPLATE_ROOT, "FORMS", "dynamicForm.js"),
  `
  import schemas from "./formSchemas.json" assert { type: "json" };
  import { validateForm } from "./validators.js";

  export function createFormEngine({ eventBus }) {
    function getSchema(id) {
      return schemas[id] || null;
    }

    function submit(id, data) {
      const schema = getSchema(id);
      if (!schema) {
        return { ok: false, reason: "schema-not-found" };
      }

      const result = validateForm(schema, data);
      if (!result.valid) {
        eventBus.emit("form:invalid", { id, errors: result.errors });
        return { ok: false, errors: result.errors };
      }

      eventBus.emit("form:submitted", { id, data });
      return { ok: true };
    }

    return {
      getSchema,
      submit
    };
  }
`
);

// COMPONENTS
writeFile(
  path.join(TEMPLATE_ROOT, "components", "PlaceholderCard.js"),
  `
  export function renderPlaceholderCard(props = {}) {
    const { title = "Placeholder Card", body = "This is a placeholder." } = props;
    return {
      type: "card",
      title,
      body
    };
  }
`
);

writeFile(
  path.join(TEMPLATE_ROOT, "components", "PlaceholderList.js"),
  `
  export function renderPlaceholderList(items = []) {
    return {
      type: "list",
      items
    };
  }
`
);

writeFile(
  path.join(TEMPLATE_ROOT, "components", "PlaceholderWidget.js"),
  `
  export function renderPlaceholderWidget(config = {}) {
    return {
      type: "widget",
      config
    };
  }
`
);

// VIEWS
writeFile(
  path.join(TEMPLATE_ROOT, "views", "MainView.js"),
  `
  import { renderPlaceholderCard } from "../components/PlaceholderCard.js";

  export function createViews({ engine, store, eventBus, panels }) {
    function renderMain(user) {
      const snapshot = store.getSnapshot();
      const immersive = panels.getImmersiveState();

      return {
        view: "MainView",
        user,
        engine: engine.getState(),
        snapshot,
        immersive,
        card: renderPlaceholderCard({
          title: "Welcome to DISTRICT_NAME",
          body: "This is a living, engine-driven district."
        })
      };
    }

    function renderLive(user) {
      const snapshot = store.getSnapshot();
      return {
        view: "LiveView",
        user,
        snapshot
      };
    }

    function renderDashboard(user) {
      const snapshot = store.getSnapshot();
      return {
        view: "DashboardView",
        user,
        snapshot
      };
    }

    return {
      renderMain,
      renderLive,
      renderDashboard
    };
  }

  export function createViewsForTests() {
    return {
      renderMain: () => ({ view: "MainView" }),
      renderLive: () => ({ view: "LiveView" }),
      renderDashboard: () => ({ view: "DashboardView" })
    };
  }
`
);

writeFile(
  path.join(TEMPLATE_ROOT, "views", "LiveView.js"),
  `
  export function renderLiveView(state) {
    return {
      type: "live",
      state
    };
  }
`
);

writeFile(
  path.join(TEMPLATE_ROOT, "views", "DashboardView.js"),
  `
  export function renderDashboardView(metrics) {
    return {
      type: "dashboard",
      metrics
    };
  }
`
);

// UTILS
writeFile(
  path.join(TEMPLATE_ROOT, "utils", "http.js"),
  `
  export async function httpGet(url, options = {}) {
    const res = await fetch(url, { method: "GET", ...options });
    if (!res.ok) throw new Error(\`HTTP GET \${url} failed: \${res.status}\`);
    return res.json();
  }

  export async function httpPost(url, body, options = {}) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(options.headers || {}) },
      body: JSON.stringify(body),
      ...options
    });
    if (!res.ok) throw new Error(\`HTTP POST \${url} failed: \${res.status}\`);
    return res.json();
  }
`
);

writeFile(
  path.join(TEMPLATE_ROOT, "utils", "format.js"),
  `
  export function formatDate(ts) {
    return new Date(ts).toISOString();
  }

  export function formatNumber(n) {
    return new Intl.NumberFormat("en-US").format(n);
  }
`
);

writeFile(
  path.join(TEMPLATE_ROOT, "utils", "logger.js"),
  `
  export function createLogger(scope = "district") {
    function log(level, message, meta = {}) {
      const entry = {
        scope,
        level,
        message,
        meta,
        at: new Date().toISOString()
      };
      // In real env: send to console, remote, etc.
      // For now: just return entry for tests.
      return entry;
    }

    return {
      info: (msg, meta) => log("info", msg, meta),
      warn: (msg, meta) => log("warn", msg, meta),
      error: (msg, meta) => log("error", msg, meta)
    };
  }
`
);

writeFile(
  path.join(TEMPLATE_ROOT, "utils", "permissions.js"),
  `
  import roles from "../access/roles.json" assert { type: "json" };
  import permissions from "../access/permissions.json" assert { type: "json" };

  export function hasAccess(user, permission) {
    if (!user || !user.role) return false;
    const allowedRoles = permissions[permission] || [];
    return allowedRoles.includes(user.role);
  }

  export function describeRole(role) {
    return roles[role] || { label: role, description: "Unknown role" };
  }
`
);

// STATE
writeFile(
  path.join(TEMPLATE_ROOT, "state", "eventBus.js"),
  `
  export function createEventBus() {
    const listeners = new Map();

    function on(event, handler) {
      if (!listeners.has(event)) listeners.set(event, new Set());
      listeners.get(event).add(handler);
      return () => off(event, handler);
    }

    function off(event, handler) {
      const set = listeners.get(event);
      if (!set) return;
      set.delete(handler);
    }

    function emit(event, payload) {
      const set = listeners.get(event);
      if (!set) return;
      for (const handler of set) {
        try {
          handler(payload);
        } catch (err) {
          // swallow for now
        }
      }
    }

    function clear() {
      listeners.clear();
    }

    return {
      on,
      off,
      emit,
      clear
    };
  }
`
);

writeFile(
  path.join(TEMPLATE_ROOT, "state", "store.js"),
  `
  export function createStore({ eventBus }) {
    const slices = new Map();
    let state = {};

    function registerSlice(name, { getState }) {
      if (slices.has(name)) return;
      slices.set(name, { getState });
      recompute();
    }

    function recompute() {
      const next = {};
      for (const [name, slice] of slices.entries()) {
        next[name] = slice.getState();
      }
      state = next;
      eventBus.emit("store:updated", { state });
    }

    function getSnapshot() {
      return { ...state };
    }

    function getSlice(name) {
      return state[name];
    }

    function update(sliceName, updater) {
      const prev = state[sliceName] || {};
      const next = updater(prev);
      slices.set(sliceName, {
        getState: () => next
      });
      recompute();
    }

    function dispatch(action, payload) {
      eventBus.emit("store:action", { action, payload });
    }

    return {
      registerSlice,
      getSnapshot,
      getSlice,
      update,
      dispatch
    };
  }
`
);

// WORKFLOWS
writeFile(
  path.join(TEMPLATE_ROOT, "workflows", "workflowEngine.js"),
  `
  import sampleWorkflow from "./sampleWorkflow.json" assert { type: "json" };

  export function createWorkflowEngine({ eventBus, store, registry }) {
    const workflows = new Map();

    function registerWorkflow(id, definition) {
      workflows.set(id, definition);
      eventBus.emit("workflow:registered", { id });
    }

    function run(id, context = {}) {
      const def = workflows.get(id);
      if (!def) {
        eventBus.emit("workflow:missing", { id });
        return null;
      }

      let ctx = { ...context, workflowId: id };

      for (const step of def.steps || []) {
        const { type, target, action } = step;

        if (type === "event") {
          eventBus.emit(target, { ctx, action });
        }

        if (type === "registry") {
          registry.invoke(target, action || "run", ctx);
        }

        if (type === "state") {
          store.update(target, (prev) => ({
            ...prev,
            lastWorkflow: id,
            lastAction: action || null
          }));
        }
      }

      eventBus.emit("workflow:completed", { id, ctx });

      return ctx;
    }

    // register sample
    registerWorkflow("heartbeat", sampleWorkflow);
    registerWorkflow("throttle", {
      id: "throttle",
      steps: [
        { type: "event", target: "engine:throttle", action: "apply" }
      ]
    });

    return {
      registerWorkflow,
      run
    };
  }
`
);

writeFile(
  path.join(TEMPLATE_ROOT, "workflows", "sampleWorkflow.json"),
  `
{
  "id": "heartbeat",
  "steps": [
    { "type": "event", "target": "engine:heartbeat", "action": "tick" },
    { "type": "state", "target": "core", "action": "heartbeat" }
  ]
}
`
);

console.log("✅ DistrictTemplate_12.x created successfully!");
