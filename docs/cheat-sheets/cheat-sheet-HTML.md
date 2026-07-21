**© 2025 Hamadi Sy. All Rights Reserved. Unauthorized distribution or reproduction is strictly prohibited.**

---

# 🚀 HTML Essentials for structuring web frontends

## Description
HTML 80/20-Principle based Cheat Sheet: Solve 80% of your daily Web Frontend Structuring needs. For Full-Stack Developers.

---

## 🎯 Purpose
Defines the **structure and content** of a web page (headings, paragraphs, images, links, forms).

---

## 🌱 Origin
Created by **Tim Berners-Lee** in **1991** as the standard markup language for the World Wide Web.  
Name = *HyperText Markup Language*.

---

## 🧠 Essentials

→ [HTML Documentation: developer.mozilla.org/en-US/docs/Web/HTML](developer.mozilla.org/en-US/docs/Web/HTML)

### 📄 Basic Structure
Every HTML file starts with a standard structure.
```html
<!DOCTYPE html>
<html>
<head>
  <title>My First Page</title>
</head>
<body>
  <h1>Hello World</h1>
</body>
</html>
```

### 📝 Text Formatting
Headings, paragraphs, bold, italic.
```html
<h2>Main Title</h2>
<p>This is a paragraph.</p>
<b>Bold</b> and <i>Italic</i> text.
```

### 📋 Lists
Ordered (`<ol>`) and unordered (`<ul>`) lists.
```html
<ul>
  <li>Apples</li>
  <li>Bananas</li>
</ul>
<ol>
  <li>First</li>
  <li>Second</li>
</ol>
```

### 📋 Tables
```html
<table border="1">
  <tr>
    <th>Name</th>
    <th>Role</th>
  </tr>
  <tr>
    <td>Alice</td>
    <td>Developer</td>
  </tr>
  <tr>
    <td>Bob</td>
    <td>Designer</td>
  </tr>
</table>
```

### 🔗 Links & Images
Use `<a>` for links and `<img>` for images.
```html
<a href="https://hamadi-sy.com/">Visit Instructors Page</a>
<br>
<img src="https://nodejs.org/static/images/logo.svg" width="200" height="100" alt="NodeJs Icon">
```

### 🎬 Multimedia
Embed audio and video.
```html
<video controls>
  <source src="movie.mp4" type="video/mp4">
</video>
<audio controls>
  <source src="song.mp3" type="audio/mpeg">
</audio>
```

### Semantics 
Gives meaning to content, improves SEO & accessibility.
```html
<!--top banner with title & navigation-->
<header>
  <h1>My TECSABlog</h1>
  <!--links menu-->
  <nav>
    <a href="#home">Home</a> |
    <a href="#articles">Articles</a> |
    <a href="#contact">Contact</a>
  </nav>
</header>
<!--main content-->
<main>
  <!--logical grouping-->
  <section id="articles">
    <!--standalone content piece-->
    <article>
      <h2>Article1: Understanding Semantic HTML</h2>
      <p>Semantic tags describe the role of content clearly.</p>
    </article>
    <article>
      <h2>Article2: Why Use Semantic Tags?</h2>
      <p>They help search engines & screen readers interpret your page.</p>
    </article>
  </section>
</main>
<!--bottom info-->
<footer>
  <p>© 2025 My TECSA Blog</p>
</footer>
```  

### 🧩 Forms & Inputs

User input with `<form>`.

```html
<form>
  <h1>User Info Form</h1>
  <!-- Text input with label -->
  <label for="username">Username:</label>
  <input id="username" type="text" placeholder="Enter your name">

  <label for="password">Password:</label>
  <input id="password" type="password" placeholder="Enter password">

  <!-- Dropdown (select) -->
  <label for="role">Role:</label>
  <select id="role">
    <option value="admin">Admin</option>
    <option value="editor">Guest</option>
  </select>

  <button type="submit">Login</button>
  <button type="reset">Reset</button>
</form>
```

### 🏗️ Divs & Spans

Structure or style content.

```html
<div class="err_msg">
    <span style="color: red;">Error - Backend not reachable</span>
</div>
```



